"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STUDIO, STATS } from "@/lib/data";

// Bedroom — the studio's story. Team cards are intentional placeholders
// until the client supplies real names and portraits.
const TEAM = [
  { initials: "R", role: "Founder & Principal Designer" },
  { initials: "S", role: "Lead Stylist" },
  { initials: "P", role: "Project Director" },
];

export default function AboutStudio() {
  return (
    <>
      {/* Story */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              {STUDIO.tagline
                .split(" ")
                .slice(0, -2)
                .join(" ")}{" "}
              <span className="text-gradient italic">
                {STUDIO.tagline.split(" ").slice(-2).join(" ")}
              </span>
              .
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              {STUDIO.name} is a Sandton-based interior design studio built on a
              simple belief: a space should feel like the person living in it.
              For over a decade we&apos;ve designed homes, workplaces, and
              hospitality spaces across Gauteng — always layering texture,
              light, and story over trend.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              We work end-to-end: concept, spatial planning, sourcing, and
              renovation oversight. You get one team, one vision, and a space
              that&apos;s ready to live in, photograph, and fall in love with.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 content-center gap-6"
          >
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6">
                <div className="font-display text-3xl text-accent">{s.value}</div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team (placeholders — swap in the real crew when the client supplies it) */}
      <section className="bg-surface/30 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 max-w-2xl"
          >
            <div className="mb-4 text-xs tracking-[0.3em] text-accent uppercase">
              The team
            </div>
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Small team,{" "}
              <span className="text-gradient italic">hands-on everywhere.</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-2xl text-accent">
                  {member.initials}
                </div>
                <div className="text-xs tracking-wider text-muted uppercase">
                  {member.role}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-background transition-all duration-300 hover:bg-accent-soft"
            >
              Meet us over a consultation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="mt-4 text-xs text-muted/60">
              <ArrowRight size={10} className="mr-1 inline" />
              Placeholder portraits — the real team photographs land with the
              client&apos;s brand shoot.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
