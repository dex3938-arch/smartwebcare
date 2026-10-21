"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/*
  Hero 3D: a slowly turning "neural network" globe — nodes on a Fibonacci sphere joined
  to their nearest neighbours, plus two orbit rings echoing the C of the SWC emblem.
  Leans toward the pointer. Additive blending on a transparent canvas, so it reads as
  light behind the glass logo card. Loaded lazily on capable desktops only.
*/

const COUNT = 220;
const RADIUS = 2.55;

function roundDot() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.9)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const { points, lines, dot } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    let s = 7;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const jitter = 1 + (rand() - 0.5) * 0.12;
      pts.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(RADIUS * jitter));
    }
    const pos = new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]));
    const seg: number[] = [];
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
        .filter((o) => o.j > i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => seg.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z));
    });
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seg), 3));
    return { points: pg, lines: lg, dot: roundDot() };
  }, []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.09;
    const { x, y } = state.pointer;
    g.rotation.x += (y * 0.28 - g.rotation.x) * 0.04;
    g.rotation.z += (-x * 0.12 - g.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      <points geometry={points}>
        <pointsMaterial
          size={0.11}
          map={dot}
          color="#67e8f9"
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.32} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <mesh rotation={[1.25, 0.25, 0.4]}>
        <torusGeometry args={[RADIUS * 1.34, 0.006, 8, 220]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[1.7, -0.5, -0.2]}>
        <torusGeometry args={[RADIUS * 1.18, 0.004, 8, 220]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function NetworkScene({ active, onReady }: { active: boolean; onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
      aria-hidden
    >
      <Network />
    </Canvas>
  );
}
