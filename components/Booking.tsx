"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";
import { STUDIO } from "@/lib/data";

const TIMES = ["09:00", "11:30", "14:00", "10:00", "15:30"];

type Slot = { day: string; date: string; month: string; time: string };

// Demo booking slots: the next five weekdays from the visitor's "today", so
// the panel never advertises dates in the past. In production this becomes a
// Cal.com / Calendly embed.
function nextWeekdaySlots(): Slot[] {
  const slots: Slot[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  while (slots.length < TIMES.length) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      slots.push({
        day: cursor.toLocaleDateString("en-ZA", { weekday: "short" }),
        date: String(cursor.getDate()).padStart(2, "0"),
        month: cursor.toLocaleDateString("en-ZA", { month: "long" }),
        time: TIMES[slots.length],
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return slots;
}

export default function Booking() {
  // Computed after mount: dates must come from the visitor's clock, not the
  // prerendered server HTML (which would bake in build-day and mismatch).
  const [slots, setSlots] = useState<Slot[] | null>(null);
  useEffect(() => setSlots(nextWeekdaySlots()), []);

  const monthLabel = slots?.[0]?.month;

  return (
    <section className="bg-surface/30 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 md:grid-cols-2"
        >
          <div>
            <div className="mb-4 text-xs tracking-[0.3em] text-accent uppercase">
              Book a meeting
            </div>
            <h2 className="mb-6 font-display text-4xl tracking-tight md:text-5xl">
              Let&apos;s talk about
              <br />
              <span className="text-gradient italic">your space.</span>
            </h2>
            <p className="mb-8 leading-relaxed text-muted">
              A free 30-minute discovery call. We&apos;ll walk through your
              project, answer your questions, and see if we&apos;re the right fit.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Video size={16} className="text-accent" /> Video or in-person (Sandton studio)
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Clock size={16} className="text-accent" /> 30 minutes · No obligation
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Calendar size={16} className="text-accent" /> Response within 24 hours
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="mb-1 text-sm text-muted">Available this week</div>
            <div className="mb-6 font-display text-2xl">{monthLabel ?? "Upcoming dates"}</div>
            <div className="space-y-2">
              {(slots ?? Array.from({ length: TIMES.length })).map((s, i) =>
                s ? (
                  <a
                    key={`${s.date}-${s.time}`}
                    href={`mailto:${STUDIO.email}?subject=${encodeURIComponent(
                      `Consultation — ${s.day} ${s.date} ${s.month} at ${s.time}`
                    )}`}
                    className="group flex items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-accent hover:bg-accent/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent/10 transition-all group-hover:bg-accent group-hover:text-background">
                        <span className="text-[10px] uppercase">{s.day}</span>
                        <span className="font-display text-lg leading-none">{s.date}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{s.time}</div>
                        <div className="text-xs text-muted">Available</div>
                      </div>
                    </div>
                    <span className="text-sm text-accent transition-transform group-hover:translate-x-1">→</span>
                  </a>
                ) : (
                  <div key={`skeleton-${i}`} className="h-[72px] animate-pulse rounded-xl bg-surface-2/50" />
                )
              )}
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Demo slots — live calendar integrates at launch.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
