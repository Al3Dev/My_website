import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

// Add font="/fonts/PressStart2P.ttf" to both <Text> when you have public/fonts/PressStart2P.ttf
function HeroModelInner() {
  return (
    <>
      <Text
        position={[0, 1, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        WORKING
      </Text>
      <Text
        position={[0, -0.5, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        HARD
      </Text>
      <OrbitControls
        enableZoom
        enablePan
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}

export default function HeroModel() {
  return (
    <div className="hero-model-wrapper">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <HeroModelInner />
      </Canvas>
    </div>
  );
}
