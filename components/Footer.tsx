import { AtSign, Mail, MapPin } from "lucide-react";
import { STUDIO } from "@/lib/data";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-display text-2xl mb-2">
            {STUDIO.short}
            <span className="text-accent">.</span>
          </div>
          <p className="text-sm text-muted max-w-xs">
            {STUDIO.department} — {STUDIO.tagline}. Bespoke interior design from {STUDIO.location}.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted">
          <a href={`mailto:${STUDIO.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail size={14} /> {STUDIO.email}
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> {STUDIO.location}
          </div>
          <a href={`https://instagram.com/${STUDIO.instagram.replace("@", "")}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <AtSign size={14} /> {STUDIO.instagram}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-xs text-muted/60">
        <div>© <CurrentYear /> {STUDIO.name}. All rights reserved.</div>
        <div>Designed &amp; built by Horizon Business Automation</div>
      </div>
    </footer>
  );
}
