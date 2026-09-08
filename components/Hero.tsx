"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { STATS } from "@/lib/data";

// 3D is client-only and heavy — load it lazily
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-accent tracking-wider uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Interior Design Studio · {`Johannesburg`}
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight"
          >
            Interiors with
            <br />
            <span className="text-gradient italic">a soul.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg text-muted max-w-md leading-relaxed"
          >
            We craft timeless, soulful spaces — where every texture, light, and
            line is chosen to tell your story. This is design you feel.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#brief"
              className="group px-7 py-3.5 rounded-full bg-accent text-background font-medium hover:bg-accent-soft transition-all duration-300 flex items-center gap-2"
            >
              Start your design brief
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#portfolio"
              className="px-7 py-3.5 rounded-full border border-border hover:border-accent/50 text-foreground transition-all duration-300"
            >
              View our work
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-accent">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative h-[400px] lg:h-[600px]"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
