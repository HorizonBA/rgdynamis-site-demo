import type { Metadata } from "next";
import RoomPage from "@/components/RoomPage";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Services — RG Dynamis",
  description:
    "Full interior design, styling, space planning, colour and material, renovation oversight, and commercial spaces.",
};

// The Dining Area — the full service menu.
export default function ServicesPage() {
  return (
    <RoomPage
      eyebrow="The Dining Area"
      title="Pull up a chair."
      lede="Everything on the menu, from a single styling day to a full turnkey renovation."
    >
      <Services />
    </RoomPage>
  );
}
