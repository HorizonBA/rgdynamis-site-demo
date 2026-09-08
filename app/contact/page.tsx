import type { Metadata } from "next";
import RoomPage from "@/components/RoomPage";
import Contact from "@/components/Contact";
import Booking from "@/components/Booking";
import DesignBrief from "@/components/DesignBrief";

export const metadata: Metadata = {
  title: "Contact & Booking — RG Dynamis",
  description:
    "Book a consultation with RG Dynamis Interior Design, or generate your personalised design brief.",
};

// The Kitchen — booking and the consultation (design brief) form.
export default function ContactPage() {
  return (
    <RoomPage
      eyebrow="The Kitchen"
      title="Where every project begins."
      lede="The kitchen is where the household gathers — so we start here. Reach out, pick a slot, or shape your brief below."
    >
      <Contact />
      <Booking />
      <DesignBrief />
    </RoomPage>
  );
}
