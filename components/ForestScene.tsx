import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Colour palette ──────────────────────────────────────────── */
const TRUNK_DARK   = new THREE.Color('#1a0e05');
const TRUNK_MID    = new THREE.Color('#2a1a08');
const FOLIAGE_DARK = new THREE.Color('#0d1f0a');
const FOLIAGE_MID  = new THREE.Color('#152b10');

/* ── Recursive branch ────────────────────────────────────────── */
interface BranchProps {
    length: number;
    radius: number;
    level: number;
    maxLevel: number;
    windSeed: number;
}

const Branch: React.FC<BranchProps> = ({ length, radius, level, maxLevel, windSeed }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const depth = level / maxLevel;
        const str   = 0.018 * depth + 0.004;
        groupRef.current.rotation.x =
            Math.sin(t * 0.65 + windSeed + level * 1.2) * str;
        groupRef.current.rotation.z =
            Math.cos(t * 0.5  + windSeed + level * 0.8) * str * 0.75;
    });

    /* foliage cluster at terminal branches */
    if (level >= maxLevel) {
        const r = radius * 9;
        return (
            <group ref={groupRef}>
                <mesh>
                    <sphereGeometry args={[r, 6, 4]} />
                    <meshStandardMaterial
                        color={level % 2 === 0 ? FOLIAGE_DARK : FOLIAGE_MID}
                        roughness={1}
                        transparent
                        opacity={0.88}
                    />
                </mesh>
                {/* second offset sphere for volume */}
                <mesh position={[r * 0.4, r * 0.3, r * 0.2]}>
                    <sphereGeometry args={[r * 0.75, 5, 3]} />
                    <meshStandardMaterial
                        color={FOLIAGE_MID}
                        roughness={1}
                        transparent
                        opacity={0.72}
                    />
                </mesh>
            </group>
        );
    }

    const childLen    = length  * 0.66;
    const childRadius = radius  * 0.62;
    const childCount  = level === 0 ? 3 : 2;
    const tiltBase    = 0.42 + level * 0.08;

    return (
        <group ref={groupRef}>
            {/* trunk cylinder */}
            <mesh position={[0, length / 2, 0]}>
                <cylinderGeometry args={[radius * 0.72, radius, length, 7, 1]} />
                <meshStandardMaterial
                    color={level < 2 ? TRUNK_DARK : TRUNK_MID}
                    roughness={0.92}
                    metalness={0.0}
                />
            </mesh>

            {/* child branches */}
            <group position={[0, length * 0.88, 0]}>
                {Array.from({ length: childCount }).map((_, i) => {
                    const angle = (i / childCount) * Math.PI * 2 + windSeed;
                    const tilt  = tiltBase + (Math.random() * 0.15);
                    return (
                        <group key={i} rotation={[tilt, angle, 0]}>
                            <Branch
                                length={childLen}
                                radius={childRadius}
                                level={level + 1}
                                maxLevel={maxLevel}
                                windSeed={windSeed + i * 1.37}
                            />
                        </group>
                    );
                })}
            </group>
        </group>
    );
};

/* ── Tree (trunk + branches) ─────────────────────────────────── */
interface TreeProps {
    maxLevel: number;
    windSeed: number;
}

const Tree: React.FC<TreeProps> = ({ maxLevel, windSeed }) => (
    <Branch length={4.2} radius={0.24} level={0} maxLevel={maxLevel} windSeed={windSeed} />
);

/* ── Floating particle fireflies ─────────────────────────────── */
const Fireflies: React.FC = () => {
    const COUNT = 120;
    const meshRef = useRef<THREE.Points>(null!);

    const { positions, phases } = useMemo(() => {
        const pos    = new Float32Array(COUNT * 3);
        const ph     = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = Math.random() * 14 + 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 6;
            ph[i]          = Math.random() * Math.PI * 2;
        }
        return { positions: pos, phases: ph };
    }, []);

    useFrame(({ clock }) => {
        const t   = clock.getElapsedTime();
        const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < COUNT; i++) {
            // gentle rising drift
            pos.array[i * 3 + 1] =
                ((t * 0.12 + phases[i] * 4) % 14) + 0.5;
            // slight horizontal wander
            pos.array[i * 3]    += Math.sin(t * 0.3 + phases[i]) * 0.003;
            pos.array[i * 3 + 2] += Math.cos(t * 0.25 + phases[i]) * 0.003;
        }
        pos.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#E8A040"
                size={0.07}
                transparent
                opacity={0.75}
                sizeAttenuation
            />
        </points>
    );
};

/* ── Rising mist particles ───────────────────────────────────── */
const MistParticles: React.FC = () => {
    const COUNT = 60;
    const meshRef = useRef<THREE.Points>(null!);

    const { positions, phases } = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        const ph  = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = Math.random() * 3;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
            ph[i]          = Math.random() * Math.PI * 2;
        }
        return { positions: pos, phases: ph };
    }, []);

    useFrame(({ clock }) => {
        const t   = clock.getElapsedTime();
        const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < COUNT; i++) {
            pos.array[i * 3 + 1] = ((t * 0.08 + phases[i] * 5) % 5);
        }
        pos.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#8899cc"
                size={0.18}
                transparent
                opacity={0.18}
                sizeAttenuation
            />
        </points>
    );
};

/* ── Ground plane ────────────────────────────────────────────── */
const Ground: React.FC = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#060310" roughness={1} />
    </mesh>
);

/* ── Forest layout ───────────────────────────────────────────── */
const TREES = [
    { x:  0,   z: -6,  scale: 1.25, maxLevel: 4, seed: 0.1  },
    { x: -7,   z: -11, scale: 0.90, maxLevel: 3, seed: 1.8  },
    { x:  8,   z: -9,  scale: 1.05, maxLevel: 4, seed: 3.3  },
    { x: -14,  z: -14, scale: 0.72, maxLevel: 3, seed: 5.1  },
    { x:  15,  z: -13, scale: 0.80, maxLevel: 3, seed: 2.6  },
    { x:  2,   z: -19, scale: 1.40, maxLevel: 4, seed: 4.4  },
    { x: -10,  z: -17, scale: 1.10, maxLevel: 4, seed: 6.0  },
    { x:  11,  z: -20, scale: 0.95, maxLevel: 3, seed: 1.2  },
    { x: -3,   z: -24, scale: 1.30, maxLevel: 4, seed: 7.7  },
    { x:  19,  z: -22, scale: 0.65, maxLevel: 3, seed: 0.9  },
    { x: -18,  z: -21, scale: 0.75, maxLevel: 3, seed: 3.8  },
    { x:  5,   z: -28, scale: 1.15, maxLevel: 4, seed: 5.5  },
];

const Forest: React.FC = () => (
    <>
        {TREES.map((t, i) => (
            <group key={i} position={[t.x, 0, t.z]} scale={t.scale}>
                <Tree maxLevel={t.maxLevel} windSeed={t.seed} />
            </group>
        ))}
    </>
);

/* ── Orbiting accent light (warm campfire) ───────────────────── */
const AccentLight: React.FC = () => {
    const ref = useRef<THREE.PointLight>(null!);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        ref.current.position.x = Math.sin(t * 0.18) * 5;
        ref.current.position.z = Math.cos(t * 0.14) * 5 - 4;
        ref.current.intensity  = 2.8 + Math.sin(t * 2.1) * 0.5;
    });
    return (
        <pointLight
            ref={ref}
            position={[0, 2.5, -2]}
            color="#E85D3A"
            intensity={3}
            distance={22}
            decay={2}
        />
    );
};

/* ── Inner Three.js scene ────────────────────────────────────── */
const Scene: React.FC = () => (
    <>
        <color attach="background" args={['#07040f']} />
        <fog attach="fog" args={['#0a0618', 18, 55]} />

        <ambientLight intensity={0.18} color="#3a2a6a" />
        <directionalLight
            position={[6, 14, 4]}
            intensity={0.55}
            color="#c8d4ff"
        />
        <AccentLight />

        <Stars radius={80} depth={40} count={2200} factor={2.5} fade speed={0.4} />

        <Forest />
        <Fireflies />
        <MistParticles />
        <Ground />
    </>
);

/* ── Public export ───────────────────────────────────────────── */
export const ForestScene: React.FC = () => (
    <Canvas
        camera={{ position: [0, 5, 14], fov: 58 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
    >
        <Scene />
    </Canvas>
);

export default ForestScene;
