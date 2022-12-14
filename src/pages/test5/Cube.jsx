import { useCallback, useRef, useState, useEffect } from "react"
import { useFrame } from '@react-three/fiber'
import { useTexture, useGLTF, useFBX, useAnimations, Environment, Clone, MeshDistortMaterial } from "@react-three/drei"
import { RigidBody, RigidBodyApi } from "@react-three/rapier"
import create from "zustand"
import dirt from "./assets/dirt.jpg"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";

import * as THREE from 'three'

// This is a super naive implementation and wouldn't allow for more than a few thousand boxes.
// In order to make this scale this has to be one instanced mesh, then it could easily be
// hundreds of thousands.

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) => set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}))

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes)
  return cubes.map((coords, index) => <Cube key={index} position={coords} />)
}

export const Cube = (props) => {
  const ref = useRef()
  const [hover, set] = useState(null)
  const addCube = useCubeStore((state) => state.addCube)
  const texture = useTexture(dirt)
  const onMove = useCallback((e) => {
    e.stopPropagation()
    set(Math.floor(e.faceIndex / 2))
  }, [])
  const onOut = useCallback(() => set(null), [])
  const onClick = useCallback((e) => {
    e.stopPropagation()
    const { x, y, z } = ref.current.translation()
    const dir = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ]
    addCube(...dir[Math.floor(e.faceIndex / 2)])
  }, [])
  return (
    <RigidBody {...props} type="fixed" colliders="cuboid" ref={ref}>
      <mesh onPointerMove={onMove} onPointerOut={onOut} onClick={onClick}>
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "hotpink" : "white"} />
        ))}
        <boxGeometry />
      </mesh>
    </RigidBody>
  )
}

// 雕像
export const Statue = (props) => {
  const gltf = useLoader(GLTFLoader, '/model/statue.glb');
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.setNextKinematicTranslation({ x: 48, y: 1.5 + Math.sin(t * 1) / 3, z: -42.2 })
  })

  return (
    <group>
      <RigidBody ref={ref} {...props} type="kinematicPosition" colliders="trimesh">
        <Clone
          object={gltf.scene}
          scale={.007}
        />
      </RigidBody>
    </group>
  )
}

// 展厅
export const Hall1 = (props) => {
  const gltf1 = useLoader(GLTFLoader, '/model/cj2.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="trimesh">
      <Clone object={gltf1.scene} scale={2} />
    </RigidBody>
  )
}

// 展厅2
export const Model = (props) => {
  const { nodes } = useGLTF("/model/scene-transformed.glb");
  return (
    // <primitive object={nodes} />
    <RigidBody {...props} type="fixed" colliders="hull">
      <group dispose={null} scale={.1}>
        {/* <group name="_Chambre" rotation={[-Math.PI / 2, 0, 0]}>
          <Clone object={nodes.Lit_ORANGE} castShadow receiveShadow />
          <Clone object={nodes.Tele_NOIR}>
          </Clone>
          <Clone object={Object.values(nodes).filter((n) => n.name.startsWith('Tapis_'))} receiveShadow />
          <Clone object={[nodes.Caisse_01_BLANC, nodes.Caisse_02_BLANC, nodes.Caisse_03_BLANC]} castShadow receiveShadow />
          <Clone
            object={nodes.Bac_fleurs_BLANC}
            castShadow
            receiveShadow
            inject={(object) =>
              object.name === 'Plante_VERT_VERT_0' && <MeshDistortMaterial speed={2.5} distort={0.25} color={[0.086, 0.58, 0.12]} roughness={0.3} />
            }
          />
          <Clone object={nodes.Carres_muraux_GRIS} castShadow receiveShadow />
          <Clone object={nodes.Fenetres_VITRE_VITRE_0} />
          <Clone object={nodes.Stores_NOIR_NOIR_0} />
          <Clone object={nodes.Tablette_NOIR_NOIR_0} />
          <Clone object={nodes.Tasse_BLANC_BLANC_0} />
          <Clone object={Object.values(nodes).filter((n) => n.name.startsWith('Vetement_'))} />
          <Clone object={nodes.Tringle_METAL_METAL_0} />
        </group> */}
        {/* <Clone object={nodes._Cuisine} castShadow receiveShadow /> */}
        <Clone object={nodes._Base} />
        {/* <Clone object={[nodes._Boites, nodes._Livres, nodes._Post_it, nodes._Ventilations]} castShadow /> */}
      </group>
    </RigidBody>

  )
}

// 飞船
export const Ship = (props) => {
  const gltf = useLoader(GLTFLoader, '/model/spaceship.glb');
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.y -= 0.005;
  });
  return (
    <RigidBody {...props} type="fixed" colliders="cuboid" >
      <primitive ref={ref} object={gltf.scene} scale={.4} />
    </RigidBody>
  )
}

// FBX
// export const Whale = (props) => {
//   const fbx = useFBX("/model/fbx/whale/source/whale.fbx");
//   const { ref, actions, names } = useAnimations(fbx.animations);
//   useEffect(() => {
//     console.log(fbx);
//     console.log(actions);
//     console.log(ref);
//     if (actions && names) actions[names[0]].play();
//   }, [actions, names]);
//   return (
//     <RigidBody type="fixed" colliders="cuboid">
//       <primitive {...props} ref={ref} object={fbx} scale={5} />
//     </RigidBody>
//   )
// }

// 鲸鱼
// GLB
export const Whale = (props) => {
  const nodes = useGLTF("/model/whale1.glb")
  const { ref, actions, names } = useAnimations(nodes.animations)
  const boxref = useRef()
  useEffect(() => {
    actions[names[0]].play();
  }, [actions, names]);
  useFrame(() => {
    boxref.current.rotation.y -= 0.002;
  });
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group ref={boxref}>
        {/* <Environment preset="warehouse" /> */}
        <primitive {...props} ref={ref} object={nodes.scene} scale={50} position={[300, 60, 0]} />
      </group>
    </RigidBody>
  )
}
