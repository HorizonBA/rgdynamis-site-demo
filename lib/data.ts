// Central content file — change names, images, services here.
// TODO: swap placeholder images for the client's real portfolio photos.

export const STUDIO = {
  name: "RG Dynamis Interior Design Department",
  short: "RG Dynamis",          // used in logo / navbar / footer wordmark
  department: "Interior Design",
  tagline: "Interiors with a soul",
  // TODO: replace with client's real details
  email: "hello@rgdynamis.co.za",
  phone: "+27 11 000 0000",
  whatsapp: "+27 82 000 0000",
  location: "Sandton, Johannesburg",
  instagram: "@rgdynamis",
};

export type Project = {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Retail";
  year: string;
  location: string;
  image: string;
  blurb: string;
};

// Using Unsplash interior photos as placeholders (free, high quality)
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "The Sandton Penthouse",
    category: "Residential",
    year: "2025",
    location: "Sandton",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    blurb: "A warm, layered penthouse balancing modern lines with collected texture.",
  },
  {
    id: "p2",
    title: "The Rosewood Apartment",
    category: "Residential",
    year: "2024",
    location: "Cape Town",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    blurb: "Soft neutrals and natural light frame an artful living space.",
  },
  {
    id: "p3",
    title: "Atelier Workspace",
    category: "Commercial",
    year: "2024",
    location: "Rosebank",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    blurb: "A creative office designed for focus, flow, and collaboration.",
  },
  {
    id: "p4",
    title: "The Olive Branch Café",
    category: "Hospitality",
    year: "2025",
    location: "Pretoria",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    blurb: "Mediterranean warmth meets contemporary café culture.",
  },
  {
    id: "p5",
    title: "Lumière Boutique",
    category: "Retail",
    year: "2023",
    location: "Melrose Arch",
    image:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
    blurb: "A sculptural retail interior that turns browsing into experience.",
  },
  {
    id: "p6",
    title: "The Houghton Villa",
    category: "Residential",
    year: "2025",
    location: "Houghton",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    blurb: "Heritage architecture reimagined with quiet, contemporary luxury.",
  },
];

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    title: "Full Interior Design",
    description:
      "End-to-end design — from concept and spatial planning to the final styled vignette.",
    icon: "Home",
  },
  {
    title: "Styling & Decoration",
    description:
      "Bring an existing space to life with curated furniture, art, and finishing touches.",
    icon: "Sofa",
  },
  {
    title: "Space Planning",
    description:
      "Smart, beautiful layouts that maximise flow, light, and how you actually live.",
    icon: "Ruler",
  },
  {
    title: "Colour & Material",
    description:
      "Considered palettes, textures, and finishes that feel timeless and distinctly yours.",
    icon: "Palette",
  },
  {
    title: "Renovation Oversight",
    description:
      "We manage contractors and trades so the build matches the vision, flawlessly.",
    icon: "HardHat",
  },
  {
    title: "Commercial Spaces",
    description:
      "Workplaces, hospitality, and retail designed to elevate your brand and your people.",
    icon: "Building2",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "We start with you — your story, your space, how you want to feel in it.",
  },
  {
    step: "02",
    title: "Concept",
    text: "Mood boards, layouts, and a clear creative direction tailored to you.",
  },
  {
    step: "03",
    title: "Create",
    text: "Sourcing, styling, and oversight — we handle every detail to the end.",
  },
  {
    step: "04",
    title: "Reveal",
    text: "A finished space that's ready to live in, photograph, and fall in love with.",
  },
];

export const STATS = [
  { value: "12+", label: "Years of design" },
  { value: "180+", label: "Spaces transformed" },
  { value: "97%", label: "Client referral rate" },
  { value: "24", label: "Industry features" },
];
