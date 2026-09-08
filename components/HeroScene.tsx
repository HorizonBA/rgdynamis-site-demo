"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import SceneErrorBoundary from "./SceneErrorBoundary";

// A floating, sculptural scene — abstract luxury forms.
function FloatingForms() {
  const torus = useRef<Mesh>(null);
  const box = useRef<Mesh>(null);
  const sphere = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torus.current) {
      torus.current.rotation.x = t * 0.3;
      torus.current.rotation.y = t * 0.2;
    }
    if (box.current) {
      box.current.rotation.y = t * 0.15;
    }
    if (sphere.current) {
      sphere.current.position.y = Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={torus} position={[-1.4, 0.6, 0]}>
          <torusKnotGeometry args={[0.5, 0.18, 128, 32]} />
          <meshStandardMaterial color="#c8a97e" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={box} position={[1.5, -0.3, -0.5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#221e1b" metalness={0.4} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={sphere} position={[0.4, 1.2, -1]}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial color="#e8dcc8" metalness={0.6} roughness={0.25} />
        </mesh>
      </Float>
    </>
  );
}

// Error boundary comes from the shared SceneErrorBoundary component.

function FallbackVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse" />
        <div className="absolute inset-8 rounded-full border border-accent/30 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl text-gradient italic">R</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroScene() {
  return (
    <SceneErrorBoundary fallback={<FallbackVisual />}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Pure local lighting — no external HDR fetch, always works */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, 2, -5]} intensity={1.2} color="#c8a97e" />
        <pointLight position={[3, -3, 2]} intensity={0.6} color="#e8dcc8" />
        <spotLight position={[0, 6, 3]} angle={0.4} intensity={1.2} color="#ffffff" />

        <FloatingForms />

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
    </SceneErrorBoundary>
  );
}
