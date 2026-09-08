import type { Metadata } from "next";
import RoomPage from "@/components/RoomPage";
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio — RG Dynamis",
  description:
    "Selected interior design work by RG Dynamis — residential, commercial, hospitality, and retail projects.",
};

// The TV Room — the project gallery, "work worth watching".
export default function PortfolioPage() {
  return (
    <RoomPage
      eyebrow="The TV Room"
      title="Work worth watching."
      lede="A selection of spaces we've designed across Gauteng — filter by the kind of project you have in mind."
    >
      <Portfolio />
    </RoomPage>
  );
}
