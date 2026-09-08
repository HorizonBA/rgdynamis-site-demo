"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Phase = "closed" | "knocking" | "opening" | "open" | "transitioning";

const DOOR_SEEN_KEY = "rg-door-seen";

// One shared AudioContext for the whole session — browsers cap the number of
// live contexts (~6 in Chrome), so creating one per knock eventually goes mute.
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    if (!audioCtx) audioCtx = new Ctor();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    return audioCtx;
  } catch (e) {
    console.warn("Audio unavailable:", e);
    return null;
  }
}

// Three thumps at 0s / 0.3s / 0.6s, matching the .knock-thump CSS animation.
function playKnock() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    [0, 0.3, 0.6].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now + delay);
      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.3, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.2);
    });
  } catch (e) {
    console.warn("Knock sound failed:", e);
  }
}

const TIMINGS = {
  knock: 900, // three audible thumps
  open: 2100, // door swing (~1.2s) settles
  transition: 3200, // warm fade starts
  navigate: 4400, // fade completes, hand off to the house
} as const;

export default function DoorEntry() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  // Clear pending phase timers if we unmount mid-sequence (e.g. navigation).
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  // Repeat visitors within this session skip straight to the house.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DOOR_SEEN_KEY) === "1") {
        router.replace("/house");
      }
    } catch {
      // Storage unavailable (private mode) — just show the door.
    }
  }, [router]);

  const goToHouse = useCallback(() => {
    try {
      sessionStorage.setItem(DOOR_SEEN_KEY, "1");
    } catch {
      // Ignore — the intro simply replays next visit.
    }
    router.push("/house");
  }, [router]);

  const handleKnock = () => {
    if (phase !== "closed") return;
    try {
      sessionStorage.setItem(DOOR_SEEN_KEY, "1");
    } catch {
      // Ignore.
    }
    playKnock();
    setPhase("knocking");
    schedule(() => setPhase("opening"), TIMINGS.knock);
    schedule(() => setPhase("open"), TIMINGS.open);
    schedule(() => setPhase("transitioning"), TIMINGS.transition);
    schedule(goToHouse, TIMINGS.navigate);
  };

  const isOpen = phase === "opening" || phase === "open" || phase === "transitioning";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      <button
        type="button"
        onClick={goToHouse}
        className={`absolute top-6 right-6 z-20 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent ${
          phase === "transitioning" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        Skip intro →
      </button>

      {/* Door scene. perspective sits on the door's direct parent so rotateY
          renders as a true 3D swing instead of a flat squash. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative h-[32rem] w-80" style={{ perspective: "1400px" }}>
          {/* Warm light spilling out from behind the door as it opens */}
          <div
            aria-hidden
            className={`absolute inset-0 rounded-lg transition-opacity duration-1000 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(232,220,200,0.6) 0%, rgba(200,169,126,0.25) 55%, transparent 75%)",
            }}
          />

          <button
            type="button"
            onClick={handleKnock}
            aria-label="Knock on the door to enter"
            className={`relative h-full w-full cursor-pointer overflow-hidden rounded-lg border-8 border-surface-2 shadow-2xl transition-colors hover:border-accent/60 ${
              phase === "knocking" ? "knock-thump" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(-95deg)" : "rotateY(0deg)",
              transformOrigin: "left center",
              transition: "transform 1200ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            <span className="flex h-full w-full bg-gradient-to-r from-surface-3 to-surface-2">
              <span className="h-full w-1/2 border-r-4 border-surface-2"></span>
              <span className="h-full w-1/2"></span>
            </span>

            <span className="absolute top-1/2 right-6 h-12 w-4 -translate-y-1/2 rounded-full bg-accent shadow-lg"></span>

            <span
              aria-hidden
              className={`absolute inset-0 bg-accent-soft/30 transition-opacity duration-1000 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            ></span>
          </button>
        </div>

        <p aria-live="polite" className="mt-8 font-display text-lg text-accent-soft">
          {phase === "closed" && "Click the door to knock"}
          {phase === "knocking" && "Knock..."}
          {phase === "opening" && "Opening..."}
          {phase === "open" && "Welcome!"}
        </p>
      </div>

      {/* Warm fade into the house — purely visual, must never block clicks. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-accent-soft transition-opacity duration-1000 ${
          phase === "transitioning" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
