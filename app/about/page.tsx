import type { Metadata } from "next";
import RoomPage from "@/components/RoomPage";
import AboutStudio from "@/components/AboutStudio";

export const metadata: Metadata = {
  title: "About — RG Dynamis",
  description:
    "The story behind RG Dynamis Interior Design Department — a Sandton studio designing interiors with a soul.",
};

// The Bedroom — the quiet room: the studio's story.
export default function AboutPage() {
  return (
    <RoomPage
      eyebrow="The Bedroom"
      title="The story behind the spaces."
      lede="Every design starts with people. Here's who we are and what we believe."
    >
      <AboutStudio />
    </RoomPage>
  );
}
