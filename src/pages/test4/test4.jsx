import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import {
    useFBX,
    useGLTF,
    useTexture,
    OrbitControls,
    PerspectiveCamera,
    Environment,
} from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { BakeShadows } from '@react-three/drei';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const Obj1 = () => {
    const fbx1 = useFBX("/model/fbx/dingbuyuanhaun.FBX");
    console.log(fbx1);
    return <primitive object={fbx1} />;
}

const Obj2 = () => {
    const gltf = useGLTF("/model/spaceship.glb");
    // const gltf = useLoader(GLTFLoader, '/model/spaceship.glb');
    return <primitive object={gltf.scene} />;
}



export default function Index({ ...props }) {
    const texture1 = useTexture('/model/textures/dingbuyuanhuan/dingbuyuanhaun_BaseColor.png')

    const pointLightPosition = [0, 10, 10];
    const cameraPosition = [20, 10, 0];
    // const cameraRotation = [Math.PI / 3, Math.PI / 2, Math.PI / 3];
    // const env = '/resource/env/view_1.hdr';

    const scale = 1

    const cam = useRef();
    // const pointLight1 = useRef();
    // useHelper(pointLight1, PointLightHelper, 5, "red");

    const controls = useRef();




    return (
        <>
            {/* <ambientLight intensity={0.5} /> */}
            {/* <spotLight position={[50, 50, -30]} castShadow /> */}
            {/* <pointLight position={[-10, -10, -10]} color="red" intensity={3} /> */}
            {/* <pointLight position={[0, -5, 5]} intensity={0.5} /> */}
            {/* <directionalLight position={[0, -5, 0]} color="red" intensity={2} /> */}
            {/* <Environment preset="warehouse" /> */}

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


            {/* <Obj1 map={texture1} /> */}
            <Obj2 />

            <OrbitControls
                makeDefault
                minAzimuthAngle={0}
                // maxAzimuthAngle={Math.PI / 2}
                // minPolarAngle={Math.PI / 3}
                // maxPolarAngle={Math.PI / 3}
                enableZoom={true}
                enablePan={true}
                zoomSpeed={0.3}
            />

        </>
    );
}