import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function InvitationModel({ heroProgress, reducedMotion }) {
  const cardRef = useRef(null);
  const tasselRef = useRef(null);

  useFrame((state) => {
    if (!cardRef.current || !tasselRef.current) {
      return;
    }

    const progress = reducedMotion ? 0 : heroProgress.get();
    const t = state.clock.getElapsedTime();
    const pointerX = reducedMotion ? 0 : state.pointer.x;
    const pointerY = reducedMotion ? 0 : state.pointer.y;

    const targetRotationY = pointerX * 0.36 + progress * 0.42;
    const targetRotationX = pointerY * -0.2 - progress * 0.2;

    cardRef.current.rotation.y = THREE.MathUtils.lerp(
      cardRef.current.rotation.y,
      targetRotationY,
      0.06,
    );
    cardRef.current.rotation.x = THREE.MathUtils.lerp(
      cardRef.current.rotation.x,
      targetRotationX,
      0.06,
    );
    cardRef.current.position.y = THREE.MathUtils.lerp(
      cardRef.current.position.y,
      Math.sin(t * 0.7) * 0.06,
      0.06,
    );

    const tasselSwing = Math.sin(t * 2.3 + progress * 5) * (reducedMotion ? 0.08 : 0.26);
    tasselRef.current.rotation.z = tasselSwing;
    tasselRef.current.rotation.x = Math.cos(t * 1.4) * 0.07;
  });

  return (
    <group ref={cardRef} position={[0, 0.4, 0]}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.22}>
        <mesh>
          <boxGeometry args={[3.2, 4.9, 0.15]} />
          <meshStandardMaterial
            color="#11151c"
            metalness={0.5}
            roughness={0.44}
            envMapIntensity={0.8}
          />
        </mesh>

        <mesh position={[0, -2.16, 0.09]}>
          <circleGeometry args={[0.28, 42]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.35} metalness={0.08} />
        </mesh>

        <Text
          position={[0, 1.34, 0.11]}
          fontSize={0.22}
          maxWidth={2.6}
          color="#f1d898"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.03}
        >
          Masha Allah
        </Text>

        <Text
          position={[0, 0.3, 0.11]}
          fontSize={1.18}
          color="#dcb76d"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          U M
        </Text>

        <Text
          position={[0, -0.65, 0.11]}
          fontSize={0.25}
          color="#f3ddb0"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          11.04.2026
        </Text>

        <group ref={tasselRef} position={[0, -2.46, 0.1]}>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.014, 0.014, 0.62, 16]} />
            <meshStandardMaterial color="#d6af5f" metalness={0.74} roughness={0.22} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.18, 20]} />
            <meshStandardMaterial color="#b18946" metalness={0.55} roughness={0.38} />
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <coneGeometry args={[0.21, 0.84, 40, 1, true]} />
            <meshStandardMaterial color="#c79f55" metalness={0.42} roughness={0.66} />
          </mesh>
        </group>
      </Float>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, -0.4]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050607" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

export default function InvitationStage3D({ heroProgress, reducedMotion }) {
  return (
    <div className="stage-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.35, 6.1], fov: 30 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#07090d", 9, 18]} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[4, 7, 4]} intensity={1.35} color="#fff5d4" />
        <directionalLight position={[-4, -1, 2]} intensity={0.28} color="#7f97c0" />
        <pointLight position={[0, 2.4, 4]} intensity={0.65} color="#f3cb79" />
        <InvitationModel heroProgress={heroProgress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
