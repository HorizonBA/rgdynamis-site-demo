"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";

const BOARDS = ["Residential", "Commercial", "Hospitality", "Retail"] as const;

const CELLS_PER_BOARD = 5;

// The View — inspiration boards. Boards are collages grouped by category;
// empty cells render as muted placeholder tiles ready for real inspiration shots.
export default function GalleryBoards() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl leading-relaxed text-muted"
        >
          The boards we pin from — moods, materials, and moments that shape how
          we design. These are seeded from our own projects; the client&apos;s
          curated inspiration shots take their place at launch.
        </motion.p>

        <div className="grid gap-6 md:grid-cols-2">
          {BOARDS.map((board, i) => {
            const items = PROJECTS.filter((p) => p.category === board);
            const placeholders = Math.max(0, CELLS_PER_BOARD - items.length);
            return (
              <motion.article
                key={board}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-surface/40 p-6"
              >
                <div className="mb-5 flex items-baseline justify-between">
                  <h2 className="font-display text-2xl">{board}</h2>
                  <span className="text-xs text-muted">{items.length} pinned</span>
                </div>

                <div className="grid auto-rows-[110px] grid-cols-3 gap-2">
                  {items.map((p, idx) => (
                    <div
                      key={p.id}
                      className={
                        idx === 0
                          ? "row-span-2 col-span-2 overflow-hidden rounded-xl"
                          : "overflow-hidden rounded-xl"
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={`${p.title} — ${board.toLowerCase()} inspiration`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                  {Array.from({ length: placeholders }).map((_, idx) => (
                    <div
                      key={`placeholder-${idx}`}
                      className="rounded-xl border border-border/60 bg-surface-2/60"
                      aria-hidden
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm text-muted">
                  {board === "Residential" &&
                    "Warm, layered homes — soft neutrals, natural light, collected texture."}
                  {board === "Commercial" &&
                    "Workspaces built for focus, flow, and the people inside them."}
                  {board === "Hospitality" &&
                    "Cafés and stays with Mediterranean warmth and contemporary calm."}
                  {board === "Retail" &&
                    "Sculptural interiors that turn browsing into an experience."}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
