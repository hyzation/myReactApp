import { useCallback, useRef, useState, useEffect } from "react"
import { useTexture, useGLTF, useFBX, useAnimations, Environment } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import create from "zustand"
import dirt from "./assets/dirt.jpg"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";


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
      <mesh receiveShadow castShadow onPointerMove={onMove} onPointerOut={onOut} onClick={onClick}>
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
  return (
    <RigidBody {...props} type="fixed" colliders="hull">
      <primitive
        object={gltf.scene}
        scale={.1}
      />
    </RigidBody>
  )
}

// 展厅
export const Hall1 = (props) => {
  const gltf1 = useLoader(GLTFLoader, '/model/cj2.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="cuboid">
      <primitive object={gltf1.scene} scale={2} />
    </RigidBody>
  )
}

// 飞船
export const Ship = (props) => {
  const gltf = useLoader(GLTFLoader, '/model/spaceship.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="cuboid">
      <primitive object={gltf.scene} scale={3} />
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
  useEffect(() => {
    actions[names[0]].play();
  }, [actions, names]);
  return (
    // <RigidBody type="fixed" colliders="trimesh">
    <group>
      {/* <Environment preset="warehouse" /> */}
      <spotLight castShadow color="white" intensity={2} position={[-50, 50, 40]} angle={0.25} penumbra={1} shadow-mapSize={[128, 128]} shadow-bias={0.00005} />
      <primitive {...props} ref={ref} object={nodes.scene} scale={1} />
    </group>
    // </RigidBody>
  )
}

