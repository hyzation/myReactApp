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

/**
 * 默认场景
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function StarsScene() {
  const AmbientLightIntensity = 0.3;
  const cam = useRef();

  console.log('drawing the Club scene');

  return (
    <>
      {/* <PerspectiveCamera makeDefault
        ref={cam}
        position={[0, 10, 10]}
        fov={75} far={2000}
      /> */}
      <Stars radius={200} depth={10} count={2000} factor={20} saturation={0} fade speed={3} />
      <ambientLight color="#FFFFFF" groundColor="blue" intensity={AmbientLightIntensity} />

      {/* <Plane args={[55, 55, 25, 25]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color="#222" attach="material" wireframe />
      </Plane> */}


      {/* <Perf position='bottom-right' /> */}

      {/* <OrbitControls
        camera={cam.current}
        target={[0, 0, 0]}
        autoRotate={true}
        autoRotateSpeed = {.2}
        makeDefault
        // minAzimuthAngle={-Math.PI}
        // maxAzimuthAngle={Math.PI}
        // minPolarAngle={0}
        // maxPolarAngle={Math.PI / 3}
        enableZoom={false}
        // minDistance={50}
        // maxDistance={200}
        // enablePan={true}
        // zoomSpeed={3}
      /> */}

    </>

  )
}
