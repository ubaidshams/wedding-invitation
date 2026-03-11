import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function VenueMiniature({ pressed }) {
  const cityRef = useRef(null);
  const pinRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (cityRef.current) {
      cityRef.current.rotation.y = Math.sin(t * 0.35) * 0.15;
    }

    if (pinRef.current) {
      const bounce = Math.sin(t * 2.5) * 0.06;
      pinRef.current.position.y = THREE.MathUtils.lerp(
        pinRef.current.position.y,
        1.58 + bounce - (pressed ? 0.18 : 0),
        0.2,
      );
      pinRef.current.scale.setScalar(pressed ? 0.9 : 1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.62} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} color="#ffe7b1" />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#8ba6cf" />

      <group ref={cityRef} position={[0, -0.7, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[2.6, 2.9, 0.72, 56]} />
          <meshStandardMaterial color="#11161f" roughness={0.78} metalness={0.3} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.38, 0]}>
          <torusGeometry args={[1.5, 0.09, 16, 80]} />
          <meshStandardMaterial color="#c79e57" roughness={0.36} metalness={0.8} />
        </mesh>

        <mesh position={[0, 0.82, 0]}>
          <boxGeometry args={[1.55, 0.96, 1.1]} />
          <meshStandardMaterial color="#1b232f" roughness={0.66} metalness={0.34} />
        </mesh>

        <mesh position={[0, 1.48, 0]}>
          <boxGeometry args={[0.88, 0.62, 0.75]} />
          <meshStandardMaterial color="#d0aa68" roughness={0.46} metalness={0.73} />
        </mesh>

        <mesh position={[0, 1.9, 0]}>
          <coneGeometry args={[0.56, 0.42, 4]} />
          <meshStandardMaterial color="#b48a49" roughness={0.5} metalness={0.62} />
        </mesh>

        <mesh position={[1.15, 0.42, 0.42]}>
          <boxGeometry args={[0.7, 0.42, 0.7]} />
          <meshStandardMaterial color="#212b38" roughness={0.68} metalness={0.3} />
        </mesh>

        <mesh position={[-1.2, 0.42, -0.32]}>
          <boxGeometry args={[0.74, 0.42, 0.6]} />
          <meshStandardMaterial color="#202a37" roughness={0.68} metalness={0.3} />
        </mesh>
      </group>

      <group ref={pinRef} position={[0.68, 1.58, 0.2]}>
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color="#f0c266" roughness={0.26} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <coneGeometry args={[0.14, 0.42, 20]} />
          <meshStandardMaterial color="#b48335" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>
    </>
  );
}

export default function MapDiorama({ mapLink }) {
  const [pressed, setPressed] = useState(false);

  function openMap() {
    setPressed(true);
    window.navigator.vibrate?.(16);
    window.setTimeout(() => setPressed(false), 220);
    window.open(mapLink, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      className={`venue-model-card ${pressed ? "is-pressed" : ""}`}
      onClick={openMap}
      aria-label="Open venue location in Google Maps"
    >
      <div className="venue-canvas">
        <Canvas camera={{ position: [4.1, 3.2, 4.2], fov: 34 }} dpr={[1, 1.7]}>
          <VenueMiniature pressed={pressed} />
        </Canvas>
      </div>
      <div className="venue-model-caption">
        <h3>KSR Palace</h3>
        <p>Tap the gold pin to open navigation</p>
      </div>
    </button>
  );
}
