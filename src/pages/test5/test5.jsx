import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import Ground from "./Ground"
import Player from "./Player"
import { Cube, Statue, Hall1, Model, Ship, Whale } from "./Cube"
import Stars from '../../components/Stars'

import { Perf } from "r3f-perf";

import './test5.css'


export default function Index() {

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
                    {/* <Sky sunPosition={[100, 20, 100]} /> */}
                    <ambientLight intensity={0.3} />
                    <pointLight castShadow intensity={0.8} position={[100, 100, 100]}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-radius={10}
                        shadow-bias={-0.0001}
                    />
                    <Stars />
                    <Physics gravity={[0, -30, 0]}>
                        <Ground />
                        <Player />
                        {/* <Cube position={[10, 0.5, 0]} /> */}
                        {/* <Cubes /> */}
                        {/* 雕像 */}
                        <Statue rotation-y={-Math.PI / 2} />
                        {/* 展厅1 */}
                        <Hall1 position={[50, -.71, -50]} rotation-y={-Math.PI / 2} />
                        {/* 展厅2 */}
                        <Model position={[-50, -0.05, -50]} />
                        {/* <Model position={[-150, -0.05, -50]} /> */}
                        {/* 飞船 */}
                        <Ship position={[48, 1.9, -73]} />
                        {/* 鲸 */}
                        <Whale position={[0, 90, 0]} />

                        {/* 显示周身体积线 */}
                        {/* <Debug /> */}
                    </Physics>
                    <PointerLockControls />

                    {/* 测试用视角 */}


                    <Perf position='bottom-right' />
                </Canvas>
            </KeyboardControls>
        </>
    )

}