import { useCallback, useRef, useState, useEffect, Suspense } from "react"
import { useFrame } from '@react-three/fiber'
import { useTexture, useGLTF, useFBX, useAnimations, Environment, Clone, MeshDistortMaterial, Billboard, Sparkles, PositionalAudio, RenderTexture, Text, PerspectiveCamera, Decal } from "@react-three/drei"
import { RigidBody, RigidBodyApi } from "@react-three/rapier"
import { LayerMaterial, Depth } from 'lamina'
import { useControls } from 'leva'

import create from "zustand"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";

import * as THREE from 'three'

import dirt from "./assets/dirt.jpg"

// This is a super naive implementation and wouldn't allow for more than a few thousand boxes.
// In order to make this scale this has to be one instanced mesh, then it could easily be
// hundreds of thousands.

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) => set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}))

// 盒子堆
export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes)
  return cubes.map((coords, index) => <Cube key={index} position={coords} />)
}

// 盒子
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
          <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "green" : "white"} />
        ))}
        <boxGeometry />
      </mesh>
    </RigidBody>
  )
}

// 入口
export const Enter = (props) => {
  const gltf1 = useLoader(GLTFLoader, '/model/buildings/emtrance.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="trimesh">
      <Clone object={gltf1.scene} scale={10} />
    </RigidBody>
  )
}

// 展厅1
export const Hall1 = (props) => {
  const gltf1 = useLoader(GLTFLoader, '/model/buildings/cj1.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="hull">
      <Clone object={gltf1.scene} scale={10} />
    </RigidBody>
  )
}

// 展厅2
export const Hall2 = (props) => {
  const gltf1 = useLoader(GLTFLoader, '/model/buildings/cj2.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="cuboid">
      <Clone object={gltf1.scene} scale={5} />
      {/* <Ship position={[-30, 2.5, 1.8]} /> */}
    </RigidBody>
  )
}

// 双子塔
export const Gemini = (props) => {
  const gltf = useLoader(GLTFLoader, '/model/buildings/gemini.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="hull">
      <Clone object={gltf.scene} scale={2.5} />
      {/* <Environment files={'/hdr/warehouse.hdr'}/> */}
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

// 鲸鱼
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
    boxref.current.rotation.y -= 0.001;
  });
  return (
    // <RigidBody type="fixed" colliders="trimesh">
    <group ref={boxref} {...props}>
      {/* <Environment preset="warehouse" /> */}
      <primitive ref={ref} object={nodes.scene}
        // position={[800, 0, 0]} scale={120}
        position={[500, 0, 0]} scale={90}
      />
      {/* <Sparkles count={50} scale={[500,500,1200]} size={200} speed={2} position={[500, 12, 0]} /> */}
    </group>
    // </RigidBody>
  )
}


// 背景音乐盒子
export const Bgm = (props) => {
  const sound = useRef()
  const textRef = useRef()

  useEffect(() => {
    // sound.current.play()
  }, []);
  return (
    <Suspense fallback={null}>
      <mesh {...props}>
        {/* <torusGeometry args={[1, 0.075, 32, 64]} /> */}
        <boxGeometry args={[16, 16, 16]} />
        <meshStandardMaterial color={'black'} metalness={0} roughness={0.2} />
        <Decal position={[0, -0.68, 0]} rotation={0} scale={[1.5, 0.15, 0.53]}>
          <meshStandardMaterial roughness={0} transparent polygonOffset polygonOffsetFactor={-10}>
            <RenderTexture attach="map" anisotropy={16}>
              <PerspectiveCamera makeDefault manual aspect={2.5 / 1} position={[0, 0, 5]} />
              <Text fontSize={1.75} letterSpacing={-0.05} color="yellow">
                let the killing begin
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>
        {/* <PositionalAudio ref={sound} loop url="/sound/foreverYoung.mp3" distance={20} /> */}
      </mesh>
    </Suspense>
  )
}
















// 测试周身特效 粒子 √ 光晕 ×
export const Sphere = ({ size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => (
  <mesh {...props}>
    <sphereGeometry args={[size, 64, 64]} />
    <meshPhysicalMaterial roughness={0} color={color} emissive={emissive || color} envMapIntensity={0.2} />
    <Glow scale={1} near={-25} color={"green"} />
    <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} />
    {/* <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size} position={[0, -size, 0]} color={emissive} opacity={0.5} /> */}
  </mesh>
)

const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
  <Billboard>
    <mesh>
      <circleGeometry args={[2 * scale, 16]} />
      <LayerMaterial
        transparent
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.DstAlphaFactor}>
        <Depth colorA={color} colorB="black" alpha={1} mode="normal" near={near * scale} far={far * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={0.5} mode="add" near={-40 * scale} far={far * 1.2 * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-15 * scale} far={far * 0.7 * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-10 * scale} far={far * 0.68 * scale} origin={[0, 0, 0]} />
      </LayerMaterial>
    </mesh>
  </Billboard>
)

