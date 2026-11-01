"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/*
  Three small WebGL scenes for the 3D pages, all in the SWC palette with additive light
  on a dark panel. Geometry is built once; per-frame work only rotates groups or moves
  a fixed particle buffer (no allocations in useFrame).
   - orbit         → Services hub: a core with four category orbits.
   - pipeline      → How we work: light flowing through six stage rings.
   - constellation → Insights hub: four topic clusters drifting in space.
*/
export type SceneVariant = "orbit" | "pipeline" | "constellation";

const CYAN = "#67e8f9";
const BLUE = "#3b82f6";
const SKY = "#93c5fd";

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.85)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Dust({ count = 260, spread = 9, seed = 3, size = 0.05 }) {
  const { geo, tex } = useMemo(() => {
    const r = seeded(seed);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (r() - 0.5) * spread * 1.6;
      pos[i * 3 + 1] = (r() - 0.5) * spread;
      pos[i * 3 + 2] = (r() - 0.5) * spread - 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo: g, tex: dotTexture() };
  }, [count, spread, seed]);
  return (
    <points geometry={geo}>
      <pointsMaterial size={size} map={tex} color={SKY} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/** Lean toward the pointer, smoothly. */
function usePointerLean(ref: React.RefObject<THREE.Group | null>, amount = 0.25, spin = 0.08) {
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += dt * spin;
    g.rotation.x += (state.pointer.y * amount - g.rotation.x) * 0.04;
  });
}

function Orbit() {
  const root = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Group | null)[]>([]);
  usePointerLean(root, 0.3, 0.05);
  const orbits = useMemo(
    () => [
      { r: 1.7, tilt: [1.2, 0.2, 0], speed: 0.42, sats: 3, color: CYAN },
      { r: 2.35, tilt: [1.45, -0.5, 0.3], speed: -0.3, sats: 4, color: BLUE },
      { r: 3.0, tilt: [1.05, 0.6, -0.2], speed: 0.22, sats: 5, color: SKY },
      { r: 3.6, tilt: [1.6, 0.1, 0.5], speed: -0.16, sats: 3, color: CYAN },
    ],
    []
  );
  useFrame((_, dt) => {
    for (let i = 0; i < orbits.length; i++) {
      const g = rings.current[i];
      if (g) g.rotation.z += dt * orbits[i].speed;
    }
  });
  return (
    <group ref={root}>
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.65} blending={THREE.AdditiveBlending} />
      </mesh>
      {orbits.map((o, i) => (
        <group key={i} rotation={o.tilt as [number, number, number]}>
          <mesh>
            <torusGeometry args={[o.r, 0.006, 8, 200]} />
            <meshBasicMaterial color={o.color} transparent opacity={0.45} />
          </mesh>
          <group ref={(el) => void (rings.current[i] = el)}>
            {Array.from({ length: o.sats }, (_, k) => {
              const a = (k / o.sats) * Math.PI * 2;
              return (
                <mesh key={k} position={[Math.cos(a) * o.r, Math.sin(a) * o.r, 0]}>
                  <sphereGeometry args={[0.07 + (k % 2) * 0.03, 16, 16]} />
                  <meshBasicMaterial color={o.color} />
                </mesh>
              );
            })}
          </group>
        </group>
      ))}
      <Dust seed={11} />
    </group>
  );
}

const FLOW = 260;

function Pipeline() {
  const root = useRef<THREE.Group>(null);
  const flow = useRef<THREE.Points>(null);
  usePointerLean(root, 0.18, 0);
  const { curve, tube, offsets, positions, tex, stages } = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.6, -1.2, -1),
      new THREE.Vector3(-2.8, 0.9, 0.2),
      new THREE.Vector3(-0.9, -0.7, 0.6),
      new THREE.Vector3(0.9, 0.8, 0.2),
      new THREE.Vector3(2.8, -0.6, -0.2),
      new THREE.Vector3(4.6, 1.1, -1),
    ]);
    const r = seeded(29);
    const off = new Float32Array(FLOW);
    for (let i = 0; i < FLOW; i++) off[i] = r();
    return {
      curve: c,
      tube: new THREE.TubeGeometry(c, 240, 0.018, 6, false),
      offsets: off,
      positions: new Float32Array(FLOW * 3),
      tex: dotTexture(),
      stages: [0.08, 0.36, 0.64, 0.92].map((t) => ({
        p: c.getPointAt(t),
        q: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), c.getTangentAt(t)),
      })),
    };
  }, []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.06;
    for (let i = 0; i < FLOW; i++) {
      const u = (offsets[i] + t) % 1;
      curve.getPointAt(u, tmp);
      const j = i * 3;
      const wobble = (offsets[i] - 0.5) * 0.18;
      positions[j] = tmp.x;
      positions[j + 1] = tmp.y + wobble;
      positions[j + 2] = tmp.z + wobble;
    }
    const attr = flow.current?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (attr) attr.needsUpdate = true;
  });
  return (
    <group ref={root} rotation={[0.15, -0.25, 0]} scale={1.18}>
      <mesh geometry={tube}>
        <meshBasicMaterial color={BLUE} transparent opacity={0.75} />
      </mesh>
      {stages.map((s, i) => (
        <mesh key={i} position={s.p} quaternion={s.q}>
          <torusGeometry args={[0.58, 0.026, 12, 80]} />
          <meshBasicMaterial color={i % 2 ? SKY : CYAN} transparent opacity={0.85} />
        </mesh>
      ))}
      <points ref={flow} geometry={geo}>
        <pointsMaterial size={0.13} map={tex} color={CYAN} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <Dust seed={5} count={180} />
    </group>
  );
}

function Constellation() {
  const root = useRef<THREE.Group>(null);
  usePointerLean(root, 0.22, 0.04);
  const { points, lines, tex } = useMemo(() => {
    const r = seeded(17);
    const centers = [
      new THREE.Vector3(-2.2, 1.0, 0),
      new THREE.Vector3(2.0, 1.2, -0.6),
      new THREE.Vector3(-1.6, -1.3, 0.4),
      new THREE.Vector3(2.3, -1.0, 0.3),
    ];
    const pts: number[] = [];
    const seg: number[] = [];
    for (const c of centers) {
      const cluster: THREE.Vector3[] = [];
      for (let i = 0; i < 26; i++) {
        const v = new THREE.Vector3((r() - 0.5) * 1.8, (r() - 0.5) * 1.5, (r() - 0.5) * 1.4).add(c);
        cluster.push(v);
        pts.push(v.x, v.y, v.z);
      }
      for (let i = 0; i < cluster.length; i++) {
        let best = -1;
        let bestD = Infinity;
        for (let j = 0; j < cluster.length; j++) {
          if (j === i) continue;
          const d = cluster[i].distanceToSquared(cluster[j]);
          if (d < bestD && j > i) {
            bestD = d;
            best = j;
          }
        }
        if (best > -1) seg.push(cluster[i].x, cluster[i].y, cluster[i].z, cluster[best].x, cluster[best].y, cluster[best].z);
      }
      seg.push(c.x, c.y, c.z, 0, 0, 0);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seg), 3));
    return { points: pg, lines: lg, tex: dotTexture() };
  }, []);
  return (
    <group ref={root}>
      <points geometry={points}>
        <pointsMaterial size={0.12} map={tex} color={CYAN} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshBasicMaterial color={SKY} wireframe />
      </mesh>
      <Dust seed={23} count={220} />
    </group>
  );
}

export default function Scenes({ variant, active, onReady }: { variant: SceneVariant; active: boolean; onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, variant === "pipeline" ? 8 : 8.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
      aria-hidden
    >
      {variant === "orbit" && <Orbit />}
      {variant === "pipeline" && <Pipeline />}
      {variant === "constellation" && <Constellation />}
    </Canvas>
  );
}
