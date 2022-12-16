import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, KeyboardControls, OrbitControls } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import { useControls } from 'leva'

import Ground from "./Ground"
import Player from "./Player"
import { Cube, Cubes, Hall1, Hall2, Enter, Gemini, Ship, Whale, Sphere, Bgm } from "./Cube"
import Stars from '../../components/Stars'

import { Perf } from "r3f-perf";

import './test5.css'


export default function Index() {
    const { Hall1Pos, Hall2Pos, EnterPos } = useControls({
        Hall1Pos: [-150, -1.9, 80],
        Hall2Pos: [150, -1.9, 120],
        EnterPos: [-17, 4, 255],
    })

    return (
        <>
            <KeyboardControls
                map={[
                    { name: "forward", keys: ["ArrowUp", "w", "W"] },
                    { name: "backward", keys: ["ArrowDown", "s", "S"] },
                    { name: "left", keys: ["ArrowLeft", "a", "A"] },
                    { name: "right", keys: ["ArrowRight", "d", "D"] },
                    { name: "jump", keys: ["Space"] },
                ]}>
                <Canvas
                    shadows
                    camera={{ fov: 45 }}
                >
                    <Suspense fallback={null}>
                        {/* <Sky sunPosition={[100, 20, 100]} /> */}
                        <ambientLight intensity={0.3} />
                        <pointLight castShadow intensity={0.8} position={[100, 100, 100]}
                            shadow-mapSize-height={1024}
                            shadow-mapSize-width={1024}
                            shadow-radius={10}
                            shadow-bias={-0.0001}
                        />
                        {/* 星空 */}
                        {/* <Stars /> */}
                        <Physics gravity={[0, -30, 0]}>
                            <Ground />
                            {/* 第一人称 */}
                            {/* <Player /> */}
                            {/* <Cube position={[10, 0.5, 0]} /> */}
                            {/* <Cubes /> */}
                            {/* 入口 */}
                            {/* <Enter position={EnterPos} /> */}
                            {/* 展厅1 */}
                            {/* <Hall2 position={Hall1Pos} rotation-y={Math.PI / 2} /> */}
                            {/* 展厅2 */}
                            {/* <Hall2 position={Hall2Pos} rotation-y={-Math.PI / 2} /> */}
                            {/* 双子塔 */}
                            {/* <Gemini position={[0, 500, -200]} /> */}
                            {/* 鲸 */}
                            {/* <Whale position={[0, 400, 0]} /> */}
                            {/* 中间球 */}
                            {/* <Sphere position={[0, 0, 0]} scale={20} /> */}
                            {/* 背景音乐 */}
                            <Bgm position={[0, 100, 0]} scale={50}/>

                            {/* 显示周身体积线 */}
                            <Debug />
                        </Physics>
                        {/* <PointerLockControls /> */}

                        {/* 测试用视角 */}
                        <OrbitControls
                        makeDefault
                        minAzimuthAngle={0}
                        minDistance={300}
                        // minDistance={100}
                        enableZoom={true}
                        enablePan={true}
                        zoomSpeed={0.3}
                    />


                        <Perf position='bottom-right' />

                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </>
    )

}