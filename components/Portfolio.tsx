"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Residential", "Commercial", "Hospitality", "Retail"] as const;

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
              Selected Work
            </div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              A portfolio of
              <br />
              <span className="text-gradient italic">lived-in beauty.</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-300 border",
                  filter === f
                    ? "bg-accent text-background border-accent"
                    : "border-border text-muted hover:border-accent/50 hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-surface border border-border cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] tracking-wider uppercase text-accent">
          {project.category}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 text-[11px] text-muted mb-2">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.location}</span>
          </div>
          <h3 className="font-display text-2xl mb-2">{project.title}</h3>
          <p className="text-sm text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
            {project.blurb}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
