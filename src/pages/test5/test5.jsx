import React, { Suspense, useState } from 'react'
import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, KeyboardControls, OrbitControls, useTexture } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import { useControls } from 'leva'

import Ground from "./Ground"
import Player from "./Player"
import { Test, Cube, Cubes, Hall1, Hall2, Enter, Gemini, Statue, Ship, Whale, Sphere, Bgm, CityRing, MagicBook, LightTube } from "./Cube"
import Stars from '../../components/Stars'
import NewSky from './NewSky'

import { Perf } from "r3f-perf";

import './test5.css'


export default function Index() {
    const { Hall1Pos, Hall2Pos, EnterPos } = useControls({
        Hall1Pos: [-230, -1.9, 250],
        Hall2Pos: [230, -1.9, 250],
        EnterPos: [-17, 4, 255],
    })

    const [Ppos, setpPos] = useState([0, 50, 200])

    const toTheSky = () => {
        setpPos([-100, 530, -300])
    }


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
                    // shadows
                    camera={{ fov: 50, far: 20000, }}
                >
                    {/* <NewSky /> */}
                    <Suspense fallback={null}>
                        {/* <Sky sunPosition={[100, 20, 100]}/> */}
                        <ambientLight intensity={.3} />
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
                            {/* <Player position={Ppos} /> */}
                            {/* 方块 */}
                            {/* <Cube position={[10, 0.5, 0]} /> */}
                            {/* <Cubes /> */}
                            {/* 入口 */}
                            {/* <Enter position={EnterPos} /> */}
                            {/* 展厅1 */}
                            {/* <Hall1 position={Hall1Pos} rotation-y={Math.PI / 2} /> */}
                            {/* 展厅2 */}
                            {/* <Hall2 position={Hall2Pos} rotation-y={-Math.PI / 2} /> */}
                            {/* 双子塔 */}
                            {/* <Gemini position={[0, 500, -300]} /> */}
                            {/* 粒子立柱 */}
                            {/* <LightTube position={[-300, 0, 350]} scale={20} /> */}
                            {/* <LightTube position={[450, 0, 350]} scale={20} /> */}
                            {/* <LightTube position={[50, 0, -200]} scale={20} /> */}
                            {/* 鲸 */}
                            {/* <Whale position={[-370, 500, 100]} /> */}
                            {/* 中间球 */}
                            {/* <Sphere position={[0, 0, 0]} scale={20} /> */}
                            {/* 人脸 */}
                            <Statue position={[-1300, 600, 0]} scale={1.9} rotation-y={Math.PI / 2} />
                            {/* 行星圈 */}
                            {/* <CityRing position={[0, 0, 2000]} scale={30} /> */}
                            {/* 魔法书 */}
                            {/* <MagicBook position={[-180, 0, -215]} scale={1} click={toTheSky} /> */}
                            {/* 背景音乐 */}
                            {/* <Bgm position={[0, 0, 0]} scale={5} /> */}
                            {/* 测试 */}
                            {/* <Test position={[-100, 0, 0]} scale={1} /> */}

                            {/* 显示周身体积线 */}
                            {/* <Debug /> */}
                        </Physics>
                        {/* <PointerLockControls /> */}

                        {/* 测试用视角 */}
                        <OrbitControls
                            makeDefault
                            minAzimuthAngle={0}
                            minDistance={12}
                            // minDistance={100}
                            enableZoom={true}
                            enablePan={true}
                            zoomSpeed={3}
                        />

                        <Perf position='bottom-right' />
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </>
    )

}