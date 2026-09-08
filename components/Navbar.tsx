"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { STUDIO } from "@/lib/data";
import { cn } from "@/lib/utils";

// Route links (the one-page anchors became real pages in Phase 3).
const LINKS = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3 glass" : "py-5 bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl tracking-wide md:text-2xl">
            {STUDIO.short}
            <span className="text-accent">.</span>
          </span>
          <span className="hidden text-[10px] tracking-[0.2em] text-muted uppercase sm:inline">
            {STUDIO.department}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "group relative text-sm transition-colors",
                pathname === l.href ? "text-accent" : "text-muted hover:text-foreground"
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                  pathname === l.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
          <Link
            href="/contact#brief"
            className="rounded-full border border-accent/40 px-5 py-2 text-sm text-accent transition-all duration-300 hover:bg-accent hover:text-background"
          >
            Start your brief
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "transition-colors",
                    pathname === l.href ? "text-accent" : "text-muted hover:text-accent"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact#brief"
                onClick={() => setOpen(false)}
                className="text-accent transition-colors hover:text-accent-soft"
              >
                Start your brief
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
