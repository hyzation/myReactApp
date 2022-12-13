import * as THREE from 'three'
import { useRef, useState } from 'react'
import {
    useGLTF,
    OrbitControls,
    MeshReflectorMaterial,
    Environment,
    CameraShake,
    useCursor,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom';

const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(221,94,115)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const material1 = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(173,165,165)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const material2 = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(1,140,210)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const material3 = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(1,100,122)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const material4 = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(234,190,160)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const material5 = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(255,188,167)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

const material6 = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(151,200,65)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

export default function Index({ props }) {
    const [hovered, setHover] = useState(false)
    useCursor(hovered)

    const navigate = useNavigate()
    const goto = (e) => {
        setTimeout(() => {
            navigate("/Halls", { state: e, });
        }, 100)
    }

    const group = useRef()

    const Model = () => {
        const { nodes } = useGLTF("/model/pinkd.glb");
        return (
            <group ref={group} {...props} dispose={null}>
                {/* <MeshReflectorMaterial
          resolution={1024}
          receiveShadow
          mirror={8}
          mixBlur={1}
          mixStrength={0.3}
          depthScale={1}
          minDepthThreshold={0.8}
          maxDepthThreshold={1}
          position={[0, 0, 8]}
          scale={[2, 2, 1]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          args={[70, 70]}>
          {(Material, props) => <Material metalness={0.25} color="rgb(207,216,220)" roughness={1} {...props} />}
        </MeshReflectorMaterial> */}

                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <MeshReflectorMaterial
                        // blur={[300, 100]}
                        resolution={2048}
                        mixBlur={1}
                        // mixStrength={1}
                        roughness={1}
                        depthScale={1.2}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="rgb(207,216,220)"
                        metalness={0.5}
                    />
                </mesh>

                {/* 圆柱 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material1}
                    geometry={nodes.Cylinder.geometry}
                    position={[-12.3, 2.41, 1.53]}
                    scale={[1, 1.2, 1]}
                    // onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    // onPointerOut={(e) => setHover(false)}
                    onClick={() => { goto(1) }}
                />
                {/* 环 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material2}
                    geometry={nodes.Torus.geometry}
                    position={[-5, 4, 0.73]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[3, 3, 3]}
                    // onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    // onPointerOut={(e) => setHover(false)}
                    onClick={() => { goto(2) }}
                />
                {/* 球 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material3}
                    geometry={nodes.Sphere001.geometry}
                    position={[11, 3.97, 2]}
                    rotation={[0, 0, 0]}
                    scale={[4, 4, 4]}
                    style={{}}
                    // onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    // onPointerOut={(e) => setHover(false)}
                    onClick={() => { goto(3) }}
                />
                {/* 正方体 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material4}
                    geometry={nodes.Cube.geometry}
                    position={[-2, 1.8, 8]}
                    rotation={[0, 0.42, 0]}
                    scale={[1.7, 1.7, 1.7]}
                    // onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    // onPointerOut={(e) => setHover(false)}
                    onClick={() => { goto(4) }}
                />
                {/* 圆锥 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material5}
                    geometry={nodes.Cone.geometry}
                    position={[4, 2.5, 13]}
                    scale={[2.5, 2.5, 2.5]}
                    // onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    // onPointerOut={(e) => setHover(false)}
                    onClick={() => { goto(5) }}
                />
                {/* 缺口圆柱 */}
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Cylinder002.geometry} position={[-1.15, 3.38, 14.39]} rotation={[0, Math.PI, 0]} /> */}
                {/* 高尔夫 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material6}
                    geometry={nodes.Icosphere001.geometry}
                    position={[-7, 1.5, 15]}
                    rotation={[-0.26, 0.04, -0.16]}
                    scale={[1.4, 1.4, 1.4]}
                    // onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    // onPointerOut={(e) => setHover(false)}
                    onClick={() => { goto(6) }}
                />
            </group>
        )
    }

    const Lights = () => {
        const ref = useRef()
        useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime))
        return (
            <group ref={ref}>
                <rectAreaLight width={15} height={100} position={[30, 30, -10]} intensity={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
            </group>
        )
    }

    const Rig = () => {
        const [vec] = useState(() => new THREE.Vector3())
        const { camera, mouse } = useThree()
        useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 8, 40), 0.05))
        // return <CameraShake maxYaw={0.01} maxPitch={0.01} maxRoll={0.01} yawFrequency={0.5} pitchFrequency={0.5} rollFrequency={0.4} />
        return <CameraShake maxYaw={0} maxPitch={0} maxRoll={0} yawFrequency={0} pitchFrequency={0} rollFrequency={0} />
    }


    return (
        <>
            <ambientLight intensity={0.5} />
            <Model position={[-4.5, -4, 0]} rotation={[0, -2.8, 0]} />
            {/* <spotLight position={[50, 50, -30]} castShadow /> */}
            {/* <pointLight position={[-10, -10, -10]} color="white" intensity={3} /> */}
            {/* <pointLight position={[0, -5, 5]} intensity={0.5} /> */}
            <directionalLight position={[0, -5, 20]} color="white" intensity={2} />
            <Lights />
            <Rig />
            <Environment files={'/hdr/warehouse.hdr'} />

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