'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Env from './Env';

/* ------------------------------------------------------------------ */
/*  Atmospheric silk ribbon — a wave-displaced plane with a gradient    */
/* ------------------------------------------------------------------ */

const silkVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float w =
      sin(p.x * 1.6 + uTime * 0.55) * 0.42 +
      sin(p.y * 2.1 - uTime * 0.42) * 0.28 +
      sin((p.x + p.y) * 1.1 + uTime * 0.3) * 0.22;
    p.z += w * uAmp;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const silkFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    float m = smoothstep(-0.9, 0.9, vWave);
    vec3 col = mix(uColorA, uColorB, m * 0.85 + vUv.x * 0.3);
    vec2 c = vUv - 0.5;
    float radial = 1.0 - smoothstep(0.08, 0.52, length(c * vec2(1.0, 1.35)));
    float edge =
      smoothstep(0.0, 0.42, vUv.x) * smoothstep(1.0, 0.58, vUv.x) *
      smoothstep(0.0, 0.46, vUv.y) * smoothstep(1.0, 0.54, vUv.y);
    float a = edge * radial * uOpacity * (0.35 + m * 0.65);
    gl_FragColor = vec4(col, a);
  }
`;

function Silk({
  position,
  rotation,
  scale,
  colorA,
  colorB,
  speed = 1,
  opacity = 0.75,
  segments = 48,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  colorA: string;
  colorB: string;
  speed?: number;
  opacity?: number;
  segments?: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: Math.random() * 10 },
      uAmp: { value: 1.0 },
      uOpacity: { value: opacity },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [colorA, colorB, opacity]
  );

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta * speed;
    if (mesh.current) mesh.current.rotation.z += delta * 0.02 * speed;
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[4.6, 2.6, segments, segments]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={silkVertex}
        fragmentShader={silkFragment}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating dust                                                       */
/* ------------------------------------------------------------------ */

function useSoftSprite() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.5)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const sprite = useSoftSprite();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;
      sizes[i] = Math.random() * 0.045 + 0.012;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const arr = p.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * (0.06 + (i % 7) * 0.012);
      arr[i * 3] += Math.sin(t * 0.18 + i) * delta * 0.03;
      if (arr[i * 3 + 1] > 5.4) arr[i * 3 + 1] = -5.4;
    }
    p.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        map={sprite}
        alphaMap={sprite}
        sizeAttenuation
        transparent
        opacity={0.34}
        color="#bcaaff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Iridescent ring — the hero's sculptural object                      */
/* ------------------------------------------------------------------ */

function Ring({ quality }: { quality: 'low' | 'high' }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * 0.18;
    m.rotation.y += delta * 0.26;
    m.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.18 + 0.1;
  });

  return (
    <mesh
      ref={ref}
      position={quality === 'high' ? [0.55, 1.75, -3.4] : [-0.75, 2.35, -4]}
      scale={quality === 'high' ? 0.62 : 0.46}
    >
      <torusGeometry args={[0.95, 0.34, quality === 'high' ? 48 : 24, quality === 'high' ? 120 : 64]} />
      <meshPhysicalMaterial
        color="#5a47c8"
        roughness={0.14}
        metalness={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={1}
        iridescenceIOR={1.8}
        emissive="#2b1f6b"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse-driven camera                                                 */
/* ------------------------------------------------------------------ */

function CameraRig({ enabled }: { enabled: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (!enabled) return;
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.035;
    camera.position.y += (pointer.y * 0.32 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({
  quality = 'high',
  interactive = true,
}: {
  quality?: 'low' | 'high';
  interactive?: boolean;
}) {
  const high = quality === 'high';
  return (
    <Canvas
      dpr={high ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: high, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      frameloop={interactive ? 'always' : 'demand'}
      className="!absolute inset-0"
    >
      <Env intensity={0.45} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.5} color="#b9a8ff" />
      <pointLight position={[-5, -2, 3]} intensity={22} color="#2f6bff" distance={16} />
      <pointLight position={[4.5, 2.5, 2]} intensity={16} color="#7b5cff" distance={14} />

      <Silk
        position={[-1.7, 0.9, -1.8]}
        rotation={[0.42, -0.35, 0.28]}
        scale={1.05}
        colorA="#17255f"
        colorB="#5a74e0"
        speed={0.9}
        opacity={0.34}
        segments={high ? 56 : 26}
      />
      <Silk
        position={[2.2, -1.25, -2.6]}
        rotation={[-0.5, 0.4, -0.3]}
        scale={0.95}
        colorA="#4a33a8"
        colorB="#b9ae9c"
        speed={0.62}
        opacity={0.26}
        segments={high ? 48 : 22}
      />

      {high && <Ring quality={quality} />}
      <Dust count={high ? 190 : 80} />
      <CameraRig enabled={interactive} />
    </Canvas>
  );
}
