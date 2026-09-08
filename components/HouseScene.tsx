"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { MathUtils, type Group, type Mesh } from "three";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { ROOMS, type Room } from "@/lib/rooms";
import { cn } from "@/lib/utils";

/*
 * Procedural 3D house hub — built entirely from primitives so the project
 * needs no external 3D assets. Palette mirrors the brand tokens in
 * globals.css (they're literal hex here because WebGL materials can't read
 * CSS variables): bronze #c8a97e, cream #e8dcc8, charcoal walls #1a1715.
 */
const FLOOR = "#241f1b";
const WALL = "#1a1715";
const WOOD = "#38312a";
const WOOD_DARK = "#2e2924";
const FABRIC = "#4a4038";
const LINEN = "#e8dcc8";
const BRONZE = "#c8a97e";

/* ---------------------------------- shell --------------------------------- */

// Floor and the three walls (front stays open toward the camera).
function Shell() {
  return (
    <group>
      {/* floor: 14 wide (x -7..7), 12 deep (z -5..7) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color={FLOOR} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* back wall */}
      <mesh position={[0, 2.3, -5]}>
        <planeGeometry args={[14, 4.6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      {/* left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7, 2.3, 1]}>
        <planeGeometry args={[12, 4.6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      {/* right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[7, 2.3, 1]}>
        <planeGeometry args={[12, 4.6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
    </group>
  );
}

/* --------------------------------- hotspot -------------------------------- */

// Floating halo above each room; bobs gently and swells when hovered.
function HotspotRing({ hovered }: { hovered: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const target = hovered ? 1.3 : 1;
    m.scale.setScalar(MathUtils.lerp(m.scale.x, target, Math.min(1, delta * 8)));
    m.position.y = 1.55 + Math.sin(state.clock.getElapsedTime() * 1.8) * 0.05;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.55, 0]}>
      <torusGeometry args={[0.16, 0.018, 12, 40]} />
      <meshStandardMaterial
        color={BRONZE}
        emissive={BRONZE}
        emissiveIntensity={hovered ? 1.6 : 0.55}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function Pendant({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.04;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.8, 6]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={BRONZE} emissive={BRONZE} emissiveIntensity={1.4} />
      </mesh>
      <pointLight intensity={0.5} color="#f0dfc0" distance={4} />
    </group>
  );
}

/* -------------------------------- furniture ------------------------------- */

function KitchenFurniture() {
  return (
    <group>
      {/* counter against the back wall + cream worktop */}
      <mesh position={[0, 0.45, -1.1]}>
        <boxGeometry args={[2.6, 0.9, 0.65]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.93, -1.1]}>
        <boxGeometry args={[2.7, 0.06, 0.72]} />
        <meshStandardMaterial color={LINEN} roughness={0.4} />
      </mesh>
      {/* island + stools */}
      <mesh position={[0, 0.425, 0.3]}>
        <boxGeometry args={[1.7, 0.85, 0.8]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.88, 0.3]}>
        <boxGeometry args={[1.78, 0.05, 0.88]} />
        <meshStandardMaterial color={LINEN} roughness={0.4} />
      </mesh>
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.275, 1]}>
          <cylinderGeometry args={[0.18, 0.16, 0.55, 16]} />
          <meshStandardMaterial color={FABRIC} roughness={0.85} />
        </mesh>
      ))}
      <Pendant position={[0, 1.55, 0.3]} />
    </group>
  );
}

function DiningFurniture() {
  const chairs: [number, number][] = [
    [-0.7, -0.85],
    [0.7, -0.85],
    [-0.7, 0.85],
    [0.7, 0.85],
  ];
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.24, 0.7, 0.24]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
      <mesh position={[0, 0.74, 0]}>
        <boxGeometry args={[2.2, 0.08, 1.1]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.07, 0.05, 0.26, 12]} />
        <meshStandardMaterial color={BRONZE} roughness={0.35} metalness={0.7} />
      </mesh>
      {chairs.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.25, z]}>
          <cylinderGeometry args={[0.17, 0.15, 0.5, 16]} />
          <meshStandardMaterial color={FABRIC} roughness={0.85} />
        </mesh>
      ))}
      <Pendant position={[0, 1.75, 0]} />
    </group>
  );
}

function TvRoomFurniture() {
  return (
    <group>
      {/* wall-mounted TV + console */}
      <mesh position={[0, 1.55, -1.5]}>
        <boxGeometry args={[1.9, 1.05, 0.06]} />
        <meshStandardMaterial color="#0a0908" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, -1.4]}>
        <boxGeometry args={[1.6, 0.4, 0.4]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>
      {/* sofa facing the TV */}
      <mesh position={[0, 0.21, 0.55]}>
        <boxGeometry args={[2.1, 0.42, 0.85]} />
        <meshStandardMaterial color={FABRIC} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.62, 0.9]}>
        <boxGeometry args={[2.1, 0.55, 0.22]} />
        <meshStandardMaterial color={FABRIC} roughness={0.9} />
      </mesh>
      {[-1.16, 1.16].map((x) => (
        <mesh key={x} position={[x, 0.38, 0.55]}>
          <boxGeometry args={[0.22, 0.52, 0.85]} />
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[-0.5, 0.47, 0.5]}>
        <boxGeometry args={[0.9, 0.12, 0.7]} />
        <meshStandardMaterial color={LINEN} roughness={0.85} />
      </mesh>
      <mesh position={[0.5, 0.47, 0.5]}>
        <boxGeometry args={[0.9, 0.12, 0.7]} />
        <meshStandardMaterial color={LINEN} roughness={0.85} />
      </mesh>
    </group>
  );
}

function BedroomFurniture() {
  return (
    <group>
      <mesh position={[0, 0.75, -1.2]}>
        <boxGeometry args={[1.7, 0.9, 0.1]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.175, 0]}>
        <boxGeometry args={[1.7, 0.35, 2.3]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.46, 0.05]}>
        <boxGeometry args={[1.6, 0.22, 2.2]} />
        <meshStandardMaterial color={LINEN} roughness={0.9} />
      </mesh>
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.62, -0.75]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.62, 0.14, 0.4]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
        </mesh>
      ))}
      {/* side table + lamp */}
      <mesh position={[1.2, 0.25, -0.9]}>
        <boxGeometry args={[0.45, 0.5, 0.45]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.62, -0.9]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={BRONZE} emissive={BRONZE} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function ViewNook() {
  // Reading nook in front of a glowing window on the right wall (local x +0.8).
  return (
    <group>
      {/* window frame + glowing pane */}
      <mesh position={[0.88, 1.7, 0]}>
        <boxGeometry args={[0.12, 1.9, 2.1]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
      </mesh>
      <mesh position={[0.8, 1.7, 0]}>
        <boxGeometry args={[0.03, 1.7, 1.9]} />
        <meshStandardMaterial
          color={LINEN}
          emissive={LINEN}
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.78, 1.7, 0]}>
        <boxGeometry args={[0.04, 1.7, 0.06]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
      <mesh position={[0.78, 1.7, 0]}>
        <boxGeometry args={[0.04, 0.06, 1.9]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
      <pointLight position={[0.3, 1.7, 0]} intensity={2.4} color="#f0dfc0" distance={7} />

      {/* round rug + armchair facing the window */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[1, 1, 0.02, 40]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.95} />
      </mesh>
      <group position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.75, 0.35, 0.75]} />
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.62, -0.33]}>
          <boxGeometry args={[0.75, 0.6, 0.16]} />
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </mesh>
        {[-0.42, 0.42].map((x) => (
          <mesh key={x} position={[x, 0.5, 0]}>
            <boxGeometry args={[0.14, 0.42, 0.7]} />
            <meshStandardMaterial color={FABRIC} roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const FURNITURE: Record<Room["id"], React.ReactNode> = {
  kitchen: <KitchenFurniture />,
  dining: <DiningFurniture />,
  tv: <TvRoomFurniture />,
  bedroom: <BedroomFurniture />,
  window: <ViewNook />,
};

/* ------------------------------- room hotspot ------------------------------ */

function RoomArea({ room }: { room: Room }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // Never leave the pointer cursor stuck if we unmount mid-hover.
  useEffect(() => () => {
    document.body.style.cursor = "auto";
  }, []);

  const go = () => router.push(room.route);

  return (
    <group
      position={room.position}
      onClick={(e) => {
        e.stopPropagation();
        go();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* clickable rug patch on the floor */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[room.size[0], 0.02, room.size[1]]} />
        <meshStandardMaterial
          color={hovered ? WOOD : WOOD_DARK}
          emissive={BRONZE}
          emissiveIntensity={hovered ? 0.22 : 0}
          roughness={0.95}
        />
      </mesh>

      {FURNITURE[room.id]}
      <HotspotRing hovered={hovered} />

      <Html
        position={[0, room.id === "window" ? 1.05 : 2.05, 0]}
        center
        distanceFactor={8}
        zIndexRange={[30, 0]}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go();
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border px-4 py-2 backdrop-blur-md transition-colors duration-300",
            hovered
              ? "border-accent bg-background/80"
              : "border-border/80 bg-background/60 hover:border-accent"
          )}
        >
          <span className="font-display text-sm whitespace-nowrap text-foreground">
            {room.name}
          </span>
          <span className="text-[10px] tracking-[0.18em] whitespace-nowrap text-accent uppercase">
            {room.hint}
          </span>
        </button>
      </Html>
    </group>
  );
}

/* ------------------------------- camera rig ------------------------------- */

// Short cinematic glide from above/far down into the room; OrbitControls takes
// over the moment it finishes (or the user grabs the view).
function CameraRig() {
  const progress = useRef(0);
  useFrame((state, delta) => {
    if (progress.current >= 1) return;
    progress.current = Math.min(1, progress.current + delta / 1.6);
    const t = 1 - Math.pow(1 - progress.current, 3);
    state.camera.position.set(0, MathUtils.lerp(5.4, 3.6, t), MathUtils.lerp(10.8, 7.6, t));
    state.camera.lookAt(0, 1, -1);
  });
  return null;
}

/* --------------------------------- fallback -------------------------------- */

function RoomMenuFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="mb-8 text-sm text-muted">
          The 3D view isn&apos;t available on this device — pick a room instead:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ROOMS.map((room) => (
            <a
              key={room.id}
              href={room.route}
              className="glass rounded-2xl px-6 py-4 text-left transition-colors hover:border-accent/50"
            >
              <div className="font-display text-lg">{room.name}</div>
              <div className="mt-1 text-[10px] tracking-[0.18em] text-accent uppercase">
                {room.hint}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- scene ---------------------------------- */

export default function HouseScene() {
  return (
    <SceneErrorBoundary fallback={<RoomMenuFallback />}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 5.4, 10.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#0c0a09", 11, 26]} />

        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 7, 4]} intensity={0.9} color="#fff2df" />
        <pointLight position={[0, 3.4, -0.5]} intensity={1.1} color="#f0dfc0" distance={16} />
        <pointLight position={[-5, 2.4, 2]} intensity={0.5} color="#c8a97e" distance={10} />

        <Shell />
        {ROOMS.map((room) => (
          <RoomArea key={room.id} room={room} />
        ))}

        <ContactShadows
          position={[0, 0.012, 0]}
          opacity={0.45}
          scale={[17, 14]}
          blur={2.2}
          far={3.5}
        />

        <CameraRig />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          target={[0, 1, -1]}
          minDistance={5.5}
          maxDistance={11}
          minPolarAngle={0.85}
          maxPolarAngle={1.42}
          minAzimuthAngle={-0.55}
          maxAzimuthAngle={0.55}
        />
      </Canvas>
    </SceneErrorBoundary>
  );
}
