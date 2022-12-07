import React, { useEffect, useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

import './test4.css'

import * as THREE from 'three'

// import './styles.css'

const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()

export default function Index() {
    const [position, setPos] = useState(dummy.set(10, 5, 10))
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

        useFrame((state, delta) => {
            const step = 0.02
            if (!canControl) {
                state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
                // state.camera.position.lerp(dummy.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)
                state.camera.position.lerp(position, step)
                // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)
                state.camera.lookAt(lookAtPos)
                state.camera.updateProjectionMatrix()
            }
        })

        return (
            <mesh
                ref={ref}
                onClick={(e) => console.log('click')}
                onPointerOver={(e) => console.log('hover')}
                onPointerOut={(e) => console.log('unhover')}>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshNormalMaterial attach="material" />
            </mesh>
        )
    }

    const ChangeCamera = (x, y, z) => {
        setCanControl(false)
        setPos(dummy.set(x, y, z))
    }

    const changeControl = () => {
        setCanControl(true)
    }

    return (
        <>
            <div className="sidebar">
                <button onClick={() => { ChangeCamera(0, 0, 10) }}>1</button>
                <button onClick={() => { ChangeCamera(0, 50, 0) }}>2</button>
                <button onClick={() => { ChangeCamera(-10, 5, 10) }}>3</button>
            </div>
            <Canvas style={{ width: '100%', height: '100vh', }}
                onMouseDown={changeControl}
            >
                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>
                    <Thing />
                    <gridHelper />

                    <OrbitControls
                        makeDefault
                        minAzimuthAngle={0}
                    // maxAzimuthAngle={Math.PI / 2}
                    // minPolarAngle={Math.PI / 3}
                    // maxPolarAngle={Math.PI / 3}
                    // enableZoom={true}
                    // enablePan={true}
                    // zoomSpeed={0.3}
                    />
                </Suspense>
            </Canvas>


        </>
    )

}