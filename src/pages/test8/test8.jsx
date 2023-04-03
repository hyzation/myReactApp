
import './test8.css'
import { useState, setStatue, useEffect, useRef, Suspense } from 'react'
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, ContactShadows, OrbitControls, AccumulativeShadows, RandomizedLight, PointerLockControls, Environment, useTexture, OrthographicCamera, useAnimations, Grid, Stage, Loader } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { Perf } from "r3f-perf";

// import { Model } from './Model'
import { AnimeCar } from './AnimeCar'
// import { Police } from './Police'

import { Menu } from './Menu'

export default function Index() {
    const [anime, setAnime] = useState(true)
    const cam = useRef();
    const env = '/hdr/warehouse.hdr'

    // const Model = (props) => {
    //     const gltf = useLoader(GLTFLoader, '/model/test/supra_glb/scene.glb');
    //     const glb = useGLTF('/model/test/supra_glb/scene.glb')
    //     const group = useRef();
    //     const { actions, names } = useAnimations(gltf.animations, group);
    //     console.log(gltf);
    //     console.log(glb);
    //     useEffect(() => {
    //         if (anime) {
    //             actions[names].reset().fadeIn(0.5).stop()
    //         } else {
    //             actions[names].reset().fadeIn(0.5).stop()
    //         }
    //     }, [actions, names, anime]);

    //     return (
    //         <group ref={group} {...props}>
    //             <primitive object={gltf.scene} />
    //         </group >
    //     );
    // }

    // const Model = (props) => {
    //     return (
    //         <group ref={group} {...props}>
    //             <primitive object={gltf.scene} />
    //         </group >
    //     );
    // }


    return (
        <>
            <Suspense fallback={<Loader />}>
                <Menu />
                <Canvas className="canvas" style={{ 'height': '100vh', }}
                    shadows
                >
                    {/* <Model scale={0.01} /> */}
                    <AnimeCar />
                    {/* <Police /> */}

                    <OrbitControls
                        makeDefault
                        target={[0, 0, 0]}
                        camera={cam.current}
                        minAzimuthAngle={0}
                        enableZoom={true}
                        enablePan={true}
                    />

                    <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
                    <ContactShadows resolution={1024} position={[0, 0, 0]} opacity={.6} scale={8} blur={1} far={50} />
                    {/* <AccumulativeShadows position={[0, 0, 0]} frames={100} alphaTest={0.9} scale={30}>
                        <RandomizedLight amount={8} radius={1} ambient={0.5} position={[5, 5, -1]} />
                    </AccumulativeShadows> */}


                    {/* <gridHelper args={[10, 10, `white`]} /> */}
                    {/* <Grid renderOrder={-1} position={[0, 0, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={30} /> */}
                    <Environment files={env} background={true} blur={1} />
                    {/* <axesHelper args={[5]} /> */}
                    {/* <Perf position='bottom-right' /> */}
                </Canvas>
            </Suspense>

        </>
    )
}