import type { Metadata } from "next";
import RoomPage from "@/components/RoomPage";
import GalleryBoards from "@/components/GalleryBoards";

export const metadata: Metadata = {
  title: "Gallery — RG Dynamis",
  description:
    "Inspiration boards from RG Dynamis Interior Design — moods, materials, and moments across residential, commercial, hospitality, and retail.",
};

// The View — the window seat: inspiration boards.
export default function GalleryPage() {
  return (
    <RoomPage
      eyebrow="The View"
      title="Inspiration from every angle."
      lede="Pull up a seat by the window and browse the boards that shape our direction."
    >
      <GalleryBoards />
    </RoomPage>
  );
}
