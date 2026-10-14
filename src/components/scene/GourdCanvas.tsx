"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { buildParticleShapes } from "./particleShapes";
import { gourdFragmentShader, gourdVertexShader } from "./gourdShaders";

const POINT_SIZE = 20;
const ASSEMBLE_DAMPING = 1.1;
const BURST_DAMPING = 5;
const BURST_STRENGTH = 0.55;
const TILT_DAMPING = 3;
const SPIN_SPEED = 0.25;

type GourdCanvasProps = {
  isActive: boolean;
  isReducedMotion: boolean;
  isBurstingRef: RefObject<boolean>;
};

function readCssColor(variableName: string) {
  return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(variableName).trim());
}

function GourdPoints({ isReducedMotion, isBurstingRef }: Omit<GourdCanvasProps, "isActive">) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const shapes = useMemo(() => buildParticleShapes(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAssemble: { value: isReducedMotion ? 1 : 0 },
      uBurst: { value: 0 },
      uSize: { value: POINT_SIZE },
      uPixelRatio: { value: gl.getPixelRatio() },
      uAccent: { value: readCssColor("--color-accent") },
      uTeal: { value: readCssColor("--color-teal") },
      uPaper: { value: readCssColor("--color-paper") },
    }),
    [gl, isReducedMotion],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    const material = materialRef.current;
    if (!group || !material || isReducedMotion) return;

    const { uTime, uAssemble, uBurst } = material.uniforms;
    uTime.value += delta;
    uAssemble.value = THREE.MathUtils.damp(uAssemble.value, 1, ASSEMBLE_DAMPING, delta);
    uBurst.value = THREE.MathUtils.damp(uBurst.value, isBurstingRef.current ? BURST_STRENGTH : 0, BURST_DAMPING, delta);

    group.rotation.y += delta * SPIN_SPEED;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, -state.pointer.y * 0.25, TILT_DAMPING, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, state.pointer.x * 0.15, TILT_DAMPING, delta);
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[shapes.gourd, 3]} />
          <bufferAttribute attach="attributes-aCloud" args={[shapes.cloud, 3]} />
          <bufferAttribute attach="attributes-aGourd" args={[shapes.gourd, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[shapes.randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={gourdVertexShader}
          fragmentShader={gourdFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Loaded with next/dynamic (client only). Rendering pauses while the tile is off screen.
export default function GourdCanvas({ isActive, isReducedMotion, isBurstingRef }: GourdCanvasProps) {
  return (
    <Canvas
      frameloop={isActive && !isReducedMotion ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
    >
      <GourdPoints isReducedMotion={isReducedMotion} isBurstingRef={isBurstingRef} />
    </Canvas>
  );
}
