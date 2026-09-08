"use client";

import { motion } from "framer-motion";
import {
  Home,
  Sofa,
  Ruler,
  Palette,
  HardHat,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, PROCESS } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Sofa,
  Ruler,
  Palette,
  HardHat,
  Building2,
};

export default function Services() {
  return (
    <>
      {/* SERVICES */}
      <section id="services" className="py-28 px-6 bg-surface/30">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-16"
          >
            <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
              What we do
            </div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              Every service your
              <br />
              <span className="text-gradient italic">space needs.</span>
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon] ?? Home;
              if (process.env.NODE_ENV !== "production" && !ICONS[s.icon]) {
                console.warn(`Services: unknown icon name "${s.icon}" in lib/data.ts — falling back to Home.`);
              }
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-background p-8 hover:bg-surface transition-colors duration-500 relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-background transition-all duration-500">
                    <Icon size={22} className="text-accent group-hover:text-background transition-colors" />
                  </div>
                  <h3 className="font-display text-xl mb-3">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {s.description}
                  </p>
                  <div className="absolute top-6 right-6 font-mono text-xs text-muted/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
              How it works
            </div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              From idea to <span className="text-gradient italic">reveal.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="font-display text-6xl text-accent/20 mb-4">
                  {p.step}
                </div>
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.text}</p>
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-accent/20">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
