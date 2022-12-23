import { useCallback, useRef, useState, useEffect, Suspense } from "react"
import { useFrame } from '@react-three/fiber'
import { useTexture, useGLTF, useFBX, useAnimations, Environment, Clone, MeshDistortMaterial, Billboard, Sparkles, PositionalAudio, RenderTexture, Text, PerspectiveCamera, Decal, Detailed } from "@react-three/drei"
import { RigidBody, RigidBodyApi } from "@react-three/rapier"
import { LayerMaterial, Depth } from 'lamina'
import { useControls } from 'leva'
import { EffectComposer, Glitch, Bloom } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

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
  const nodes = useGLTF('/model/buildings/hologram.glb')
  const { ref, actions, names } = useAnimations(nodes.animations)
  const boxref = useRef()
  useEffect(() => {
    actions[names[0]].play();
  }, [actions, names]);

  return (
    <>
      <group ref={boxref} {...props}>
        {/* <Environment preset="warehouse" /> */}
        <primitive ref={ref} object={nodes.scene}
          // position={[800, 0, 0]} scale={120}
          position={[0, 14, 0]} scale={8}
        />
        {/* <Sparkles count={50} scale={[500,500,1200]} size={200} speed={2} position={[500, 12, 0]} /> */}
      </group>
    </>
  )
}

// 展厅2
export const Hall2 = (props) => {
  const gltf1 = useLoader(GLTFLoader, '/model/buildings/cj2.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="cuboid">
      <Clone object={gltf1.scene} scale={5} />
    </RigidBody>
  )
}

// 双子塔
export const Gemini = (props) => {
  const gltf = useLoader(GLTFLoader, '/model/buildings/gemini.glb');
  return (
    <RigidBody {...props} type="fixed" colliders="trimesh">
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
  const gltf = useLoader(GLTFLoader, '/model/face.glb');
  const Effects = () => {
    return (
      <EffectComposer>
        {/* <Glitch
          delay={[0.5, 1.5]}
          duration={[0.6, 1.0]}
          strength={[0.1, 0.2]}
          mode={GlitchMode.CONSTANT_MILD} // try CONSTANT_MILD
          active={true} // toggle on/off
          ratio={0.1}
        /> */}
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={3}
        />
      </EffectComposer>
    );
  }
  // const ref = useRef();

  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   ref.current.setNextKinematicTranslation({ x: -1200, y: 750 + Math.sin(t * 1) / 3, z: -80 })
  // })

  return (
    <group {...props}>
      {/* <RigidBody ref={ref} {...props} type="kinematicPosition" colliders="cuboid"> */}
      <Clone
        // ref={ref} 
        object={gltf.scene}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <Effects />
      {/* </RigidBody> */}
    </group>
  )
}

// 魔法书
export const MagicBook = (props) => {
  const gltf = useLoader(GLTFLoader, '/model/buildings/magicBook.glb');
  const [bookcolor, setBookcolor] = useState(null)
  const onMove = () => {
    setBookcolor('red')
  }
  const onOut = () => {
    setBookcolor('grey')
  }
  const onClick = () => {
    props.click(123)
  }
  return (
    <RigidBody onPointerMove={onMove} onPointerOut={onOut} onClick={onClick} {...props} type="kinematicPosition" colliders="cuboid">
      {/* <pointLight intensity={5} position={[0, 0, 0]} color={bookcolor} /> */}
      <Clone object={gltf.scene} scale={1} />
    </RigidBody>
  )
}

// 动态立柱
export const LightTube = (props) => {
  const nodes = useGLTF('/model/lightTube.glb')
  const { ref, actions, names } = useAnimations(nodes.animations)
  const boxref = useRef()
  useEffect(() => {
    actions[names[0]].play();
  }, [actions, names]);

  return (
    <>
      <group ref={boxref} {...props}>
        {/* <Environment preset="warehouse" /> */}
        <Clone ref={ref} object={nodes.scene}
          // position={[800, 0, 0]} scale={120}
          position={[0, 12, 0]}
          scale={25}
          rotation={[0, 0, Math.PI / 2]}
        />
      </group>
    </>
  )
}

// 行星圈
export const CityRing = (props) => {
  const ref = useRef()
  const gltf = useLoader(GLTFLoader, '/model/buildings/cityRing.glb');
  useFrame(() => {
    ref.current.rotation.z -= 0.001;
  });
  return (
    <group ref={ref} {...props}>
      <Clone object={gltf.scene} scale={[100, 100, 100]} />
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
    boxref.current.rotation.y -= 0.02;
  });
  return (
    // <RigidBody type="fixed" colliders="trimesh">
    <group ref={boxref} {...props}>
      <primitive ref={ref} object={nodes.scene}
        position={[1000, 0, 0]} scale={90}
      />
      {/* <Sparkles count={50} scale={[500,500,1200]} size={200} speed={2} position={[500, 12, 0]} /> */}
    </group>
    // </RigidBody>
  )
}

// 背景音乐盒子(drei)
// export const Bgm = (props) => {
//   const sound = useRef()
//   useEffect(() => {
//     setTimeout(() => {
//       sound.current.play()
//     }, 100)
//   }, []);
//   return (
//     <Suspense fallback={null}>
//       <PositionalAudio ref={sound} loop url="/sound/foreverYoung.mp3" distance={100} />
//     </Suspense>
//   )
// }

// 背景音乐盒子(three)
export const Bgm = (props) => {
  const ref = useRef()
  const [sound, setSound] = useState()
  const [listener, setListener] = useState()
  const [analyser, setAnalyser] = useState()
  const [data, setData] = useState(1)

  useEffect(() => {
    const listener = new THREE.AudioListener()
    setListener(listener)
    const sound = new THREE.PositionalAudio(listener)
    setSound(sound)
    const analyser = new THREE.AudioAnalyser(sound, 32)
    setAnalyser(analyser)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load('/sound/LookAtMe.mp3', (buffer) => {
      sound.setBuffer(buffer)
      sound.setLoop(true)
      sound.setVolume(12)
      sound.play()
    })
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const data = analyser.getAverageFrequency()
      console.log(data);
      setData(data)
      // ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1)
      // ref.current.rotation.x = lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1)
      // ref.current.rotation.y = 0.2
    }
  })

  return (
    <>
      <Suspense fallback={null}>
        <group ref={ref}>
          <Text
            size={16}
          >
            XXX
          </Text>
        </group>
      </Suspense>
    </>
  )
}


// 测试周身特效 粒子 √ 光晕 ×
export const Sphere = ({ size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshPhysicalMaterial color={color} emissive={emissive || color} envMapIntensity={0.2} metalness={1} roughness={.01}
      />
      {/* <Glow scale={1} near={-25} color={"green"} /> */}
      {/* <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} /> */}
      {/* <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size} position={[0, -size, 0]} color={emissive} opacity={0.5} /> */}
    </mesh>
  )
}

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








// 测试
export const Test = (props) => {
  const nodes = useGLTF('/model/buildings/hologram.glb')
  const { ref, actions, names } = useAnimations(nodes.animations)
  const boxref = useRef()
  useEffect(() => {
    actions[names[0]].play();
  }, [actions, names]);

  return (
    <>
      <group ref={boxref} {...props}>
        {/* <Environment preset="warehouse" /> */}
        <primitive ref={ref} object={nodes.scene}
          // position={[800, 0, 0]} scale={120}
          position={[0, 14, 0]} scale={8}
        />
        {/* <Sparkles count={50} scale={[500,500,1200]} size={200} speed={2} position={[500, 12, 0]} /> */}
      </group>
    </>
  )
}