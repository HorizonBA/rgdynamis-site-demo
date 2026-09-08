"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { STUDIO } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Get in touch
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            Let&apos;s create something
            <br />
            <span className="text-gradient italic">beautiful.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          <ContactCard icon={<Mail size={20} />} label="Email" value={STUDIO.email} href={`mailto:${STUDIO.email}`} />
          <ContactCard icon={<Phone size={20} />} label="Phone" value={STUDIO.phone} href={`tel:${STUDIO.phone.replace(/\s/g, "")}`} />
          <ContactCard icon={<MapPin size={20} />} label="Studio" value={STUDIO.location} />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass rounded-2xl p-8 text-center h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-5">
        {icon}
      </div>
      <div className="text-xs tracking-wider uppercase text-muted mb-2">{label}</div>
      <div className="font-display text-lg">{value}</div>
    </motion.div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
