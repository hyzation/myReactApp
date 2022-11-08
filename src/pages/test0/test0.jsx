import React, {
    useRef,
    Suspense,
} from "react";
import {
    OrbitControls,
    PerspectiveCamera,
    // Environment,
    // useHelper,
} from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import {
// PointLightHelper,
// } from "three";
import {
    // useFrame,
    useLoader,
} from "@react-three/fiber";
// import { Perf } from "r3f-perf";
// import {useControls, folder} from "leva";

export default function Index() {
    const pointLightPosition = [0, 10, 10];
    const cameraPosition = [20, 10, 0];
    // const cameraRotation = [Math.PI / 3, Math.PI / 2, Math.PI / 3];
    // const env = '/resource/env/view_1.hdr';

    const gltf = useLoader(GLTFLoader, '/model/spaceship.glb');
    const scale = 1

    const cam = useRef();
    // const pointLight1 = useRef();
    // useHelper(pointLight1, PointLightHelper, 5, "red");

    const controls = useRef();

    return (
        <>
            <PerspectiveCamera
                makeDefault
                ref={cam}
                position={cameraPosition}
                fov={75} far={2000}
            />

            <pointLight
                // ref={pointLight1}
                position={pointLightPosition}
                intensity={1}
                distance={30}
            />

            <Suspense fallback={null}>
                <primitive object={gltf.scene} scale={[scale, scale, scale]} />
            </Suspense>

            <OrbitControls
                ref={controls}
                autoRotate={true}
                autoRotateSpeed={1}
                camera={cam.current}
                target={[0, 0, 0]}
                // makeDefault
                // minAzimuthAngle={-Math.PI}
                // maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 3}
                enableZoom={true}
                minDistance={10}
                maxDistance={30}
                enablePan={false}
            // zoomSpeed={0.3}
            />
        </>
    );
}