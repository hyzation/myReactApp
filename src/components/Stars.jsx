import React, {
  useRef,
  // useState
} from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  // Plane,
  Stars,
} from "@react-three/drei";
// import { Perf } from "r3f-perf";
// import DotsRender from '../model/MR/DotsRender';
// import Dots from '../model/MR/Dots';
import { useFrame } from '@react-three/fiber';

/**
 * 默认场景
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function StarsScene() {
  const AmbientLightIntensity = 0.3;
  const cam = useRef();

  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y -= 0.0001;
  });

  return (
    <>
      {/* <PerspectiveCamera makeDefault
        ref={cam}
        position={[0, 10, 10]}
        fov={75} far={2000}
      /> */}
      <Stars ref={ref} radius={500} depth={100} count={5000} factor={20} saturation={0} fade speed={3} />
      <ambientLight color="#FFFFFF" groundColor="blue" intensity={AmbientLightIntensity} />

      {/* <Plane args={[55, 55, 25, 25]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color="#222" attach="material" wireframe />
      </Plane> */}


      {/* <Perf position='bottom-right' /> */}

    </>
  )
}
