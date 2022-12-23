import React, {
    useRef,
    Suspense,
} from "react";
import {
    OrbitControls,
    PerspectiveCamera,
    useGLTF,
} from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
    useLoader,
    useThree,
    useFrame,
} from "@react-three/fiber";

import {
    CubeTextureLoader,
} from "three";

export default function Index() {
    const pointLightPosition = [0, 10, 10];
    const cameraPosition = [20, 10, 0];
    // const cameraRotation = [Math.PI / 3, Math.PI / 2, Math.PI / 3];
    // const env = '/resource/env/view_1.hdr';

    const Model = () => {
        // const gltf = useLoader(GLTFLoader, '/model/cj2.glb');
        const gltf = useGLTF('/model/spaceship.glb');
        return <primitive object={gltf.scene} scale={1} />
    }

    const SkyBox = () => {
        const { scene } = useThree();
        const loader = new CubeTextureLoader();
        // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
        const texture = loader.load([
            "/image/space2/right.jpg",
            "/image/space2/left.jpg",
            "/image/space2/right.jpg",
            "/image/space2/bottom.jpg",
            "/image/space2/front.jpg",
            "/image/space2/back.jpg",
        ]);

        // Set the scene background property to the resulting texture.
        scene.background = texture;
        return null;
    }

    const CameraControls = () => {
        // Get a reference to the Three.js Camera, and the canvas html element.
        // We need these to setup the OrbitControls class.
        // https://threejs.org/docs/#examples/en/controls/OrbitControls

        const {
            camera,
            gl: { domElement }
        } = useThree();

        // Ref to the controls, so that we can update them on every frame using useFrame
        const controls = useRef();
        useFrame(() => controls.current.update());
        return (
            <OrbitControls
                ref={controls}
                args={[camera, domElement]}
                autoRotate={false}
                enableZoom={false}
            />
        );
    };

    const cam = useRef();

    const controls = useRef();
    return (
        <>
            {/* <PerspectiveCamera
                makeDefault
                // ref={cam}
                position={cameraPosition}
                fov={75} far={20000}
            /> */}

            <pointLight
                // ref={pointLight1}
                position={pointLightPosition}
                intensity={1}
                distance={30}
            />

            <CameraControls />

            {/* <Model /> */}

            <SkyBox />

            {/* <OrbitControls
                ref={controls}
                autoRotate={false}
                autoRotateSpeed={1}
                camera={cam.current}
                target={[0, 0, 0]}
                // makeDefault
                // minAzimuthAngle={-Math.PI}
                // maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                enableZoom={true}
                minDistance={10}
                // maxDistance={30}
                enablePan={false}
            // zoomSpeed={0.3}
            /> */}
        </>
    );
}