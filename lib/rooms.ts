// Single source of truth for the 3D house hub: which room sits where in the
// scene and which page it opens. The README room-to-page table mirrors this.

export type RoomId = "kitchen" | "dining" | "tv" | "bedroom" | "window";

export type Room = {
  id: RoomId;
  name: string;
  hint: string;
  route: string;
  /** Hotspot group anchor in scene coordinates. */
  position: [number, number, number];
  /** Clickable floor footprint [width, depth] (the "rug"). */
  size: [number, number];
};

export const ROOMS: Room[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    hint: "Book a consultation",
    route: "/contact",
    position: [-4.9, 0, -3.1],
    size: [3.2, 3.4],
  },
  {
    id: "dining",
    name: "Dining Area",
    hint: "Our services",
    route: "/services",
    position: [0, 0, -3.1],
    size: [3.4, 3.4],
  },
  {
    id: "tv",
    name: "TV Room",
    hint: "Selected work",
    route: "/portfolio",
    position: [4.9, 0, -3.1],
    size: [3.2, 3.4],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    hint: "About the studio",
    route: "/about",
    position: [-4.9, 0, 1.9],
    size: [3.2, 3.2],
  },
  {
    id: "window",
    name: "The View",
    hint: "Inspiration boards",
    route: "/gallery",
    position: [5.9, 0, 1.5],
    size: [2.0, 2.8],
  },
];
