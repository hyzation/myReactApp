import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'

import * as THREE from 'three'

// import './styles.css'

const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()

const Thing = () => {
    const ref = useRef()
    // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

    const [zoom, setZoom] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setZoom((zoom) => !zoom)
        }, 5000)
    }, [zoom])

    useFrame((state, delta) => {
        const step = 0.01
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
        state.camera.position.lerp(dummy.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)

        // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)

        state.camera.lookAt(lookAtPos)
        state.camera.updateProjectionMatrix()
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

export default function Index() {
    return (
        <>
            <Thing />
            <gridHelper />
        </>
    )

}

// ReactDOM.render(
//     <Canvas>
//     </Canvas>,
//     document.getElementById('root')
// )
