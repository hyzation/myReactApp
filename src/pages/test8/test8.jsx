
import './test8.css'
import { useState, setStatue, useEffect, useRef } from 'react'
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, ContactShadows, OrbitControls, Environment, useTexture, Decal, OrthographicCamera, useAnimations, Grid, Stage } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { Perf } from "r3f-perf";

import { Model } from './Model'
import { Menu } from './Menu'

export default function Index() {
    const [anime, setAnime] = useState(true)

    const startAnime = () => {
        console.log(123);
        setAnime(anime ? false : true)
    }

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
            {/* <div className='anime1' onClick={startAnime}>111</div> */}
            <Menu />
            <Canvas className="canvas" style={{ 'height': '100vh', }}
                camera={{ position: [-4, 3, -4], fov: 50 }}
            >
                <Model scale={0.01} />
                <OrbitControls
                    makeDefault
                    minAzimuthAngle={0}
                    enableZoom={true}
                    enablePan={true}
                // autoRotate
                // minDistance={0.8}
                // maxDistance={1.5}
                />
                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
                <ContactShadows resolution={512} position={[0, 0, 0]} opacity={1} scale={10} blur={2} far={1} />

                {/* <gridHelper args={[10, 10, `white`]} /> */}
                <Grid renderOrder={-1} position={[0, 0, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={30} />
                <Environment preset="city" background={true} blur={1} />
                <axesHelper args={[5]} />
                <Perf position='bottom-right' />
            </Canvas>
        </>
    )
}

useGLTF.preload('/model/test/supra_glb/scene.glb')