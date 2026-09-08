"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Answers = {
  name: string;
  email: string;
  spaceType: string;
  rooms: string[];
  style: string;
  budget: string;
  timeline: string;
  mood: string;
};

const EMPTY: Answers = {
  name: "",
  email: "",
  spaceType: "",
  rooms: [],
  style: "",
  budget: "",
  timeline: "",
  mood: "",
};

const SPACE_TYPES = ["Apartment", "House", "Office", "Café / Restaurant", "Retail store", "Other"];
const ROOMS = ["Living room", "Kitchen", "Bedroom", "Bathroom", "Home office", "Dining room", "Full home"];
const STYLES = ["Minimal", "Warm & organic", "Modern luxury", "Scandinavian", "Industrial", "Eclectic", "Not sure yet"];
const BUDGETS = ["R50k – R150k", "R150k – R500k", "R500k – R1.5m", "R1.5m+", "Prefer to discuss"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Just exploring"];
const MOODS = ["Calm", "Bold", "Cozy", "Sophisticated", "Playful", "Serene"];

const TOTAL_STEPS = 6;

// Deliberately simple — good enough to catch "abc" without blocking anyone.
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function DesignBrief() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [status, setStatus] = useState<"form" | "thinking" | "done">("form");
  const [brief, setBrief] = useState<string>("");
  const timer = useRef<number | null>(null);

  // Don't let the "AI analysis" timer fire after unmount.
  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );

  const update = (patch: Partial<Answers>) =>
    setAnswers((a) => ({ ...a, ...patch }));

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return answers.name.trim() !== "" && isValidEmail(answers.email);
      case 1: return answers.spaceType !== "";
      case 2: return answers.rooms.length > 0;
      case 3: return answers.style !== "";
      case 4: return answers.budget !== "" && answers.timeline !== "";
      case 5: return answers.mood !== "";
      default: return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else submit();
  };
  const back = () => step > 0 && setStep(step - 1);

  const submit = () => {
    if (status !== "form") return; // guards double-clicks and re-entry
    setStatus("thinking");
    // Simulated AI analysis — in production this calls an LLM endpoint.
    timer.current = window.setTimeout(() => {
      setBrief(generateBrief(answers));
      setStatus("done");
    }, 2600);
  };

  const editAnswers = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    setStatus("form");
  };

  const toggleRoom = (r: string) => {
    setAnswers((a) => ({
      ...a,
      rooms: a.rooms.includes(r)
        ? a.rooms.filter((x) => x !== r)
        : [...a.rooms, r],
    }));
  };

  return (
    <section id="brief" className="relative overflow-hidden px-6 py-28">
      <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-accent glass">
            <Sparkles size={12} /> Powered by AI
          </div>
          <h2 className="mb-4 font-display text-4xl tracking-tight md:text-6xl">
            Your design brief,
            <br />
            <span className="text-gradient italic">in two minutes.</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            Answer a few questions and our AI instantly shapes a personalised
            design direction with suggested style and investment range. We then
            turn it into a full, tailored quotation.
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {status === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Progress */}
                <div className="mb-8 flex items-center gap-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all duration-500",
                        i <= step ? "bg-accent" : "bg-border"
                      )}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* STEP 0 — contact */}
                    {step === 0 && (
                      <div className="space-y-5">
                        <Label htmlFor="brief-name">Let&apos;s start with your name</Label>
                        <input
                          id="brief-name"
                          value={answers.name}
                          onChange={(e) => update({ name: e.target.value })}
                          placeholder="Your name"
                          autoComplete="name"
                          className="input"
                        />
                        <Label htmlFor="brief-email">And the best email to reach you</Label>
                        <input
                          id="brief-email"
                          type="email"
                          value={answers.email}
                          onChange={(e) => update({ email: e.target.value })}
                          placeholder="you@email.com"
                          autoComplete="email"
                          className="input"
                        />
                        {answers.email.trim() !== "" && !isValidEmail(answers.email) && (
                          <p className="-mt-2 text-xs text-red-400/90">
                            That email doesn&apos;t look complete yet.
                          </p>
                        )}
                      </div>
                    )}

                    {/* STEP 1 — space type */}
                    {step === 1 && (
                      <div>
                        <Label>What kind of space is it?</Label>
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                          {SPACE_TYPES.map((s) => (
                            <Chip
                              key={s}
                              active={answers.spaceType === s}
                              onClick={() => update({ spaceType: s })}
                            >
                              {s}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2 — rooms */}
                    {step === 2 && (
                      <div>
                        <Label>Which rooms are we designing? <span className="text-muted">(select all)</span></Label>
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                          {ROOMS.map((r) => (
                            <Chip
                              key={r}
                              active={answers.rooms.includes(r)}
                              onClick={() => toggleRoom(r)}
                            >
                              {answers.rooms.includes(r) && <Check size={14} />} {r}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 3 — style */}
                    {step === 3 && (
                      <div>
                        <Label>What style speaks to you?</Label>
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                          {STYLES.map((s) => (
                            <Chip
                              key={s}
                              active={answers.style === s}
                              onClick={() => update({ style: s })}
                            >
                              {s}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 4 — budget + timeline */}
                    {step === 4 && (
                      <div className="space-y-8">
                        <div>
                          <Label>Approximate budget</Label>
                          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                            {BUDGETS.map((b) => (
                              <Chip
                                key={b}
                                active={answers.budget === b}
                                onClick={() => update({ budget: b })}
                              >
                                {b}
                              </Chip>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>When do you want to start?</Label>
                          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                            {TIMELINES.map((t) => (
                              <Chip
                                key={t}
                                active={answers.timeline === t}
                                onClick={() => update({ timeline: t })}
                              >
                                {t}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5 — mood */}
                    {step === 5 && (
                      <div>
                        <Label>How should the space feel?</Label>
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                          {MOODS.map((m) => (
                            <Chip
                              key={m}
                              active={answers.mood === m}
                              onClick={() => update({ mood: m })}
                            >
                              {m}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-30"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-background transition-all hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === TOTAL_STEPS - 1 ? (
                      <>
                        <Sparkles size={16} /> Generate my brief
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {status === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <Loader2 className="mx-auto mb-6 animate-spin text-accent" size={40} />
                <div className="mb-2 font-display text-2xl">Designing your brief…</div>
                <p className="text-sm text-muted">
                  Analysing your style, rooms, and mood
                </p>
              </motion.div>
            )}

            {status === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4"
              >
                <div className="mb-6 flex items-center gap-2 text-accent">
                  <Sparkles size={18} />
                  <span className="text-xs tracking-[0.2em] uppercase">Your personalised brief</span>
                </div>
                <div className="font-light leading-relaxed whitespace-pre-line text-foreground/90">
                  {brief}
                </div>
                <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5">
                  <p className="mb-4 text-sm text-muted">
                    This is your instant direction. Ready for the full tailored
                    quotation and a consultation?
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-background transition-all hover:bg-accent-soft"
                    >
                      Book my consultation <ArrowRight size={16} />
                    </a>
                    <button
                      type="button"
                      onClick={editAnswers}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      <ArrowLeft size={14} /> Edit my answers
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-display text-2xl tracking-tight md:text-3xl"
    >
      {children}
    </label>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-center text-sm transition-all duration-200",
        active
          ? "border-accent bg-accent text-background"
          : "border-border text-muted hover:border-accent/50 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

// Simple "AI" generator — deterministic mock based on the answers.
// In production, swap this for a call to an LLM API (OpenAI / Anthropic).
function generateBrief(a: Answers): string {
  const firstName = a.name.trim().split(/\s+/)[0];
  const mood = a.mood.toLowerCase();

  return `Hello ${firstName} —

Based on your brief, here's what I see coming together for your ${a.spaceType.toLowerCase()}.

We'll design your ${a.rooms.join(", ").toLowerCase()} with a ${a.style.toLowerCase()} sensibility, anchored by a ${mood} mood throughout. Think layered textures, intentional light, and pieces chosen to make the space feel unmistakably yours.

Style direction: ${a.style}
Suggested palette: warm neutrals, soft taupes, and a metallic accent
Investment range: ${a.budget}
Timeline: ${a.timeline}

Every recommendation from here will be tailored to your space, your light, and how you actually live in it. The next step is a short consultation where we translate this direction into a full quotation with mood boards and a room-by-room plan.`;
}
