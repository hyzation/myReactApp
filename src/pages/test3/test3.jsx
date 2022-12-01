import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import {
    useGLTF, Clone,
    MeshDistortMaterial,
    OrbitControls,
    PerspectiveCamera,
    OrthographicCamera,
    Reflector,
    Environment,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { BakeShadows } from '@react-three/drei';

const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(199,98,143)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

export default function Index({ ...props }) {

    const goto = (e) => {
        console.log(e);
    }


    const pointLightPosition = [0, 10, 10];
    const cameraPosition = [200, 280, 0];

    const cam = useRef();

    const controls = useRef();

    const group = useRef()

    const Model = () => {
        const { nodes } = useGLTF("/model/pinkd.glb");
        return (
            // <primitive object={nodes} />
            // <group ref={group} {...props} dispose={null}>
            //     <group name="_Chambre" rotation={[-Math.PI / 2, 0, 0]}>
            //         <Clone object={nodes.Lit_ORANGE} castShadow receiveShadow />
            //         <Clone object={nodes.Tele_NOIR}>
            //             <Screen />
            //         </Clone>
            //         <Clone object={Object.values(nodes).filter((n) => n.name.startsWith('Tapis_'))} receiveShadow />
            //         <Clone object={[nodes.Caisse_01_BLANC, nodes.Caisse_02_BLANC, nodes.Caisse_03_BLANC]} castShadow receiveShadow />
            //         <Clone
            //             object={nodes.Bac_fleurs_BLANC}
            //             castShadow
            //             receiveShadow
            //             inject={(object) =>
            //                 object.name === 'Plante_VERT_VERT_0' && <MeshDistortMaterial speed={2.5} distort={0.25} color={[0.086, 0.58, 0.12]} roughness={0.3} />
            //             }
            //         />
            //         <Clone object={nodes.Carres_muraux_GRIS} castShadow receiveShadow />
            //         <Clone object={nodes.Fenetres_VITRE_VITRE_0} />
            //         <Clone object={nodes.Stores_NOIR_NOIR_0} />
            //         <Clone object={nodes.Tablette_NOIR_NOIR_0} />
            //         <Clone object={nodes.Tasse_BLANC_BLANC_0} />
            //         <Clone object={Object.values(nodes).filter((n) => n.name.startsWith('Vetement_'))} />
            //         <Clone object={nodes.Tringle_METAL_METAL_0} />
            //     </group>
            //     <Clone object={nodes._Cuisine} castShadow receiveShadow />
            //     <Clone object={nodes._Base} castShadow receiveShadow />
            //     <Clone object={[nodes._Boites, nodes._Livres, nodes._Post_it, nodes._Ventilations]} castShadow />
            //     <Lights />
            // </group>
            <group ref={group} {...props} dispose={null}>
                <Reflector
                    resolution={1024}
                    receiveShadow
                    mirror={0}
                    mixBlur={1}
                    mixStrength={0.3}
                    depthScale={1}
                    minDepthThreshold={0.8}
                    maxDepthThreshold={1}
                    position={[0, 0, 8]}
                    scale={[2, 2, 1]}
                    rotation={[-Math.PI / 2, 0, Math.PI]}
                    args={[70, 70]}>
                    {(Material, props) => <Material metalness={0.25} color="#eea6b1" roughness={1} {...props} />}
                </Reflector>
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere.geometry} position={[-1.93, 1, -0.94]} rotation={[-Math.PI, 0.73, -Math.PI]} /> */}
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere001.geometry} position={[4.49, 2.34, 3.58]} scale={[2.33, 2.33, 2.33]} onClick={() => { goto(1) }} /> */}
                {/* 球 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material}
                    geometry={nodes.Sphere001.geometry}
                    position={[-16, 5, 17]}
                    rotation={[-0.26, 0.04, -0.16]}
                    scale={[3, 3, 3]}
                />
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere002.geometry} position={[-5.28, 4.8, 5.12]} /> */}
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere003.geometry} position={[-10.13, 1.3, -3.95]} rotation={[-0.15, 0.01, -0.02]} /> */}
                {/* 海星家 */}
                {/* <mesh
                    receiveShadow
                    castShadow
                    material={material}
                    geometry={nodes.Sphere004.geometry}
                    position={[-19.36, 1.05, -2.05]}
                    rotation={[0, 0, 0.64]}
                    scale={[-1.33, -1.33, -1.33]}
                /> */}
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere005.geometry} position={[-18.17, 0.94, -2.35]} scale={[0.87, 0.87, 0.87]} /> */}
                {/* 环 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material}
                    geometry={nodes.Torus.geometry}
                    position={[-0.36, 3, 0.73]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[2, 2, 2]}
                />
                {/* 圆锥 */}
                <mesh receiveShadow castShadow material={material} geometry={nodes.Cone.geometry} position={[2.3, 1.91, -4.41]} scale={[1.86, 1.86, 1.86]} />
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Cone001.geometry} position={[-4.82, 0.47, -5.51]} rotation={[2.14, 0, -0.58]} /> */}
                {/* 正方体 */}
                <mesh
                    receiveShadow
                    castShadow
                    material={material}
                    geometry={nodes.Cube.geometry}
                    position={[-5.36, 1.94, 5.46]}
                    rotation={[0, 0.42, 0]}
                    scale={[1.9, 1.9, 1.9]}
                />
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Cube001.geometry} position={[-1.8, 1, -10.04]} rotation={[0, -0.23, 0]} /> */}
                {/* 圆柱 */}
                <mesh receiveShadow castShadow material={material} geometry={nodes.Cylinder.geometry} position={[-12.3, 2.41, 1.53]} />
                {/* <mesh
                    receiveShadow
                    castShadow
                    material={material}
                    geometry={nodes.Cylinder001.geometry}
                    position={[-10.47, 1.57, -8.75]}
                    rotation={[Math.PI / 2, 0, -1.87]}
                    scale={[1.55, 1.55, 1.55]}
                /> */}
                {/* 缺口圆柱 */}
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Cylinder002.geometry} position={[-1.15, 3.38, 14.39]} rotation={[0, Math.PI, 0]} /> */}
                {/* <mesh receiveShadow castShadow material={material} geometry={nodes.Icosphere.geometry} position={[7.29, 0.6, -5.63]} scale={[0.64, 0.64, 0.64]} /> */}
                {/* 高尔夫 */}
                <mesh receiveShadow castShadow material={material} geometry={nodes.Icosphere001.geometry} position={[7.26, 1.5, 12.9]} rotation={[-0.26, 0.04, -0.16]} scale={[1.55, 1.55, 1.55]} />
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

    return (
        <>
            {/* <ambientLight intensity={0.5} /> */}
            <Model position={[-4.5, -4, 0]} rotation={[0, -2.8, 0]} />
            {/* <spotLight position={[50, 50, -30]} castShadow /> */}
            {/* <pointLight position={[-10, -10, -10]} color="red" intensity={3} /> */}
            {/* <pointLight position={[0, -5, 5]} intensity={0.5} /> */}
            {/* <directionalLight position={[0, -5, 0]} color="red" intensity={2} /> */}
            <Lights />
            <Environment preset="warehouse" />

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