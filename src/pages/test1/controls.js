import { useRef } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'

import { MapControls } from "@react-three/drei";

extend({ MapControls })

function Controls(props) {
    const controls = useRef()
    const { camera, gl } = useThree()
    useFrame(() => {
        controls.current.update()
    })
    return (
        <MapControls
            ref={controls}
            args={[camera, gl.domElement]}
            enableDamping={true}
            dampingFactor={0.05}
            minDistance={100}
            maxDistance={500}
            maxPolarAngle={Math.PI / 2}
            enableRotate={true}
            {...props}
        />
    )
}

export default Controls
