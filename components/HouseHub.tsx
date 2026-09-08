"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { STUDIO } from "@/lib/data";

// 3D is client-only and heavy — load it lazily (same pattern as Hero).
const HouseScene = dynamic(() => import("./HouseScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-pulse rounded-full border border-accent/30" />
        <p className="font-display text-xl text-accent-soft">Lighting the rooms…</p>
      </div>
    </div>
  ),
});

export default function HouseHub() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      <HouseScene />

      {/* Overlay chrome — pointer-events stay with the canvas underneath. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between p-6">
        <Link
          href="/"
          className="pointer-events-auto font-display text-xl tracking-wide hover:text-accent transition-colors"
        >
          {STUDIO.short}
          <span className="text-accent">.</span>
        </Link>
        <p className="hidden pt-1 text-xs tracking-[0.25em] text-muted uppercase sm:block">
          Click a room to explore
        </p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center p-6">
        <p className="glass rounded-full px-5 py-2 text-xs text-muted">
          Drag to look around · Click a room to enter
        </p>
      </div>
    </main>
  );
}
