import type { Metadata } from "next";
import HouseHub from "@/components/HouseHub";

export const metadata: Metadata = {
  title: "Inside the House — RG Dynamis",
  description:
    "Explore RG Dynamis room by room: the kitchen, dining area, TV room, bedroom, and the view.",
};

export default function HousePage() {
  return <HouseHub />;
}
