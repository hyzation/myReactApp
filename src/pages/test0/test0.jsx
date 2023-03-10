import React, { useRef, Suspense } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
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
import { useGLTF, ContactShadows, OrbitControls, Environment } from "@react-three/drei";

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

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
        "/image/space3/right.jpg",
        "/image/space3/left.jpg",
        "/image/space3/right.jpg",
        "/image/space3/bottom.jpg",
        "/image/space3/front.jpg",
        "/image/space3/back.jpg",
    ]);

    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
}

function Zain(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/superBrain.glb");
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                geometry={nodes.brain.geometry}
                material={nodes.brain.material}
                position={[-0.79, 0.55, -0.1]}
                rotation={[1.58, 0, 0]}
                scale={[3.59, 3.59, 3.59]}
            />
            <mesh
                geometry={nodes.rightBrain.geometry}
                material={nodes.rightBrain.material}
                position={[0.05, 1.87, 0.75]}
                rotation={[1.58, 0, 0]}
                scale={[3.59, 3.59, 3.59]}
            />
            <mesh
                geometry={nodes.amygdala.geometry}
                material={nodes.amygdala.material}
                position={[-0.77, 1.28, 0.89]}
                rotation={[1.58, 0, 0]}
                scale={[3.59, 3.59, 3.59]}
            />
            <mesh
                geometry={nodes.leftBrain.geometry}
                material={nodes.leftBrain.material}
                position={[-1.49, 1.87, 0.75]}
                rotation={[1.58, 0, 0]}
                scale={[3.59, 3.59, 3.59]}
            />
        </group>
    );
}

// Geometry

// Lights
function App() {
    return (
        <Canvas className="canvas" style={{ 'height': '100vh', }}>
            {/* <SkyBox /> */}
            <Environment
                background={true} // can be true, false or "only" (which only sets the background) (default: false)
                // path='/resource/env/steps/'
                files={
                    ["/image/space3/right.jpg",
                        "/image/space3/left.jpg",
                        "/image/space3/top.jpg",
                        "/image/space3/bottom.jpg",
                        "/image/space3/front.jpg",
                        "/image/space3/back.jpg",]
                }
                preset={null}
                scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
                encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
            />
            <OrbitControls
                makeDefault
                minAzimuthAngle={0}
                minDistance={12}
                // minDistance={100}
                enableZoom={true}
                enablePan={true}
                zoomSpeed={3}
            />
        </Canvas>
    );
}

export default App;
