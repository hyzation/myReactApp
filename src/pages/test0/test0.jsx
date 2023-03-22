import React, { useRef, Suspense } from "react";
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
    CubeTextureLoader,
    CubeCamera,
    WebGLCubeRenderTarget,
    RGBFormat,
    LinearMipmapLinearFilter
} from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import "./styles.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF, ContactShadows, OrbitControls, Environment, useTexture, Decal } from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from 'three'

extend({ OrbitControls });

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
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            autoRotate={true}
            enableZoom={false}
        />
    );
};


const Model = () => {
    const { nodes } = useGLTF("/model/bunny.gltf")
    const nodes1 = useGLTF("/model/bunny.gltf")
    const nodes2 = useLoader(GLTFLoader, '/model/buildings/emtrance.glb');

    console.log(nodes);
    // console.log(nodes1);
    // console.log(nodes2);
    return (
        // <primitive object={nodes.Scene}
        //     scale={2}
        // />
        <mesh castShadow receiveShadow geometry={nodes.bunny.geometry} dispose={null}>
            <meshStandardMaterial
                color="white"
                roughness={0}
                metalness={0.5}
            />
            <Mydecal props={nodes} />
        </mesh>
    )
}



const Mydecal = (props) => {
    console.log(props);
    let model = props.props.bunny
    const texture = useTexture("/image/wut.jpg");
    const handleDecalMove = () => {
        console.log(123);
    }

    return (
            <Decal
                position={[-1, 1.75, 0.6]} rotation={-0.7} scale={.25} map={texture} map-anisotropy={16}
                // onPointerMove={handleDecalMove}
                onClick={handleDecalMove}
            // onPointerUp={() => console.log("Decal dropped!")}
            >
                {/* <meshStandardMaterial attach="material" map={texture} /> */}
            </Decal>
    )
}

// Geometry

// Lights
function App() {
    return (
        <Canvas className="canvas" style={{ 'height': '100vh', }}>

            <pointLight
                castShadow
                intensity={0.8}
                position={[0, 100, 10]}
                shadow-mapSize-height={1024}
                shadow-mapSize-width={1024}
                shadow-radius={10}
                shadow-bias={-0.0001}
            />

            {/* <ambientLight
                color='#fff'
                intensity={0.2}
                decay={2}
            /> */}

            {/* <SkyBox /> */}
            <Environment
                background={true} // can be true, false or "only" (which only sets the background) (default: false)
                // path='/resource/env/steps/'
                files={
                    [
                        "/image/space/right.jpg",
                        "/image/space/left.jpg",
                        "/image/space/top.jpg",
                        "/image/space/bottom.jpg",
                        "/image/space/front.jpg",
                        "/image/space/back.jpg",
                    ]
                }
                preset={false}
                scene={false} // adds the ability to pass a custom THREE.Scene, can also be a ref
                blur={1}
            // encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
            />

            <Model />

            <OrbitControls
                makeDefault
                minAzimuthAngle={0}
                enableZoom={true}
                enablePan={true}
                zoomSpeed={3}
                minDistance={2}
                maxDistance={12}
            />
            <Perf position='bottom-left' />
            <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={1} far={8} />
            {/* <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={8} /> */}
        </Canvas>
    );
}

export default App;
