import React, { useEffect, useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, CameraControls } from '@react-three/drei'
import { Vector3 } from 'three';

import './test10.css'

import * as THREE from 'three'

// import './styles.css'

const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()

export default function Index() {
    const [position, setPos] = useState([10, 5, 10])
    const [canControl, setCanControl] = useState(false)

    const Thing = () => {
        const ref = useRef()
        useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
        const [zoom, setZoom] = useState(false)
        // useEffect(() => {
        //     setTimeout(() => {
        //         setZoom((zoom) => !zoom)
        //     }, 5000)
        // }, [zoom])

        // useFrame((state, delta) => {
        //     const step = 0.02
        //     if (!canControl) {
        //         console.log(123);
        //         state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
        //         // state.camera.position.lerp(dummy.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)
        //         state.camera.position.lerp(position, step)
        //         // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)
        //         // state.camera.lookAt(lookAtPos)
        //         state.camera.updateProjectionMatrix()
        //     }
        // })

        return (
            <mesh
                castShadow
                receiveShadow
                ref={ref}>
                <boxGeometry attach="geometry" args={[1, 1, 1]} />
                {/* <meshNormalMaterial attach="material" /> */}
                <meshStandardMaterial color={"red"} />
            </mesh>
        )
    }

    const Sphere = () => {
        const sphereRef = useRef();
        useFrame(() => {
            sphereRef.current.rotation.z -= 0.01;
        });
        return (
            <group ref={sphereRef}>
                <mesh castShadow receiveShadow position={[1, 1, 0]}>
                    <sphereGeometry args={[0.25, 24, 24]} />
                    <meshStandardMaterial color={"blue"} />
                </mesh>
            </group>
        );
    };

    const ChangeCamera = (x, y, z, a, b, c) => {
        // setCanControl(false)
        // setPos(dummy.set(x, y, z))
        settestpos([x, y, z, a, b, c])
    }

    const changeControl = () => {
        setCanControl(true)
    }


    const [testpos, settestpos] = useState(null)
    const Cameraset = () => {
        const { DEG2RAD } = THREE.MathUtils
        const cameraControlsRef = useRef()
        useEffect(() => {
            console.log(cameraControlsRef.current._camera);
            // cameraControlsRef.current?.lerpLookAt(0, 0, 0, 0.5);
            // cameraControlsRef.current.rotate(45 * DEG2RAD, -40 * DEG2RAD, 0.1)
            if (testpos) {
                cameraControlsRef.current.setLookAt(testpos[0], testpos[1], testpos[2], testpos[3], testpos[4], testpos[5], true)
            }
        }, [testpos]);

        return (
            <CameraControls
                ref={cameraControlsRef}
            />
        )
    }


    return (
        <>
            <div className="sidebar">
                <button onClick={() => { ChangeCamera(0, 10, 10, 20, 0, 2) }}>Pos1</button>
                <button onClick={() => { ChangeCamera(0, 20, 0, 10, 2, 3) }}>Pos2</button>
                <button onClick={() => { ChangeCamera(-10, 5, 10, 0, 0, 0) }}>Pos3</button>
            </div>
            <Canvas
                style={{ width: '100%', height: '100vh', }}
                onMouseDown={changeControl}
                shadows
            // shadowMap={{ type: THREE.VSMShadowMap }}
            >
                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>
                    <Cameraset />
                    <directionalLight
                        position={[0, 5, 0]}
                        castShadow
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-radius={10}
                        shadow-bias={-0.0001}
                    />
                    <Thing />
                    <Sphere />

                    <gridHelper />

                    <OrbitControls
                        makeDefault
                        minAzimuthAngle={0}
                    />
                </Suspense>
            </Canvas>


        </>
    )

}