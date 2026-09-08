import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Shared shell for every room destination page: site chrome, a compact
// "which room you're in" header, and the back-to-hub link.
export default function RoomPage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <header className="mx-auto max-w-7xl px-6 pt-8 pb-2">
          <Link
            href="/house"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> Back to the house
          </Link>
          <div className="mt-8 mb-3 text-xs tracking-[0.3em] text-accent uppercase">
            {eyebrow}
          </div>
          <h1 className="font-display text-3xl tracking-tight md:text-5xl">{title}</h1>
          {lede && <p className="mt-4 max-w-xl leading-relaxed text-muted">{lede}</p>}
        </header>
        {children}
      </main>
      <Footer />
    </>
  );
}
