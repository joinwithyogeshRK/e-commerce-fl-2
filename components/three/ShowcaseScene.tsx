'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Env from './Env';

function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.22;
  });
  return (
    <mesh ref={ref} scale={1.28}>
      <torusKnotGeometry args={[0.82, 0.3, 180, 32]} />
      <MeshDistortMaterial
        color="#6a54d8"
        distort={0.26}
        speed={1.1}
        roughness={0.14}
        metalness={0.62}
        emissive="#3a2a8c"
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}

function Orbiters() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.z = state.clock.elapsedTime * 0.12;
  });
  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 2.05,
            Math.sin((i / 3) * Math.PI * 2) * 2.05,
            0,
          ]}
        >
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshBasicMaterial color={i === 1 ? '#2f6bff' : '#c9bcff'} />
        </mesh>
      ))}
    </group>
  );
}

export default function ShowcaseScene({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.2], fov: 44 }}
      className="!absolute inset-0"
    >
      <Env intensity={0.85} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#cbbcff" />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#2f6bff" distance={12} />
      <Float speed={1.3} rotationIntensity={0.45} floatIntensity={0.7}>
        <Knot />
      </Float>
      <Orbiters />
      <pointLight position={[2, 3, -4]} intensity={14} color="#ffffff" distance={14} />
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
        />
      )}
    </Canvas>
  );
}
