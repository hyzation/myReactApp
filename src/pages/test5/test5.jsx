import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import Ground from "./Ground"
import Player from "./Player"
import { Cube, Statue, Hall1, Ship, Whale } from "./Cube"
import Stars from '../../components/Stars'

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
                <Canvas shadows camera={{ fov: 45 }} >
                    {/* <Sky sunPosition={[100, 20, 100]} /> */}
                    <ambientLight intensity={0.3} />
                    <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
                    {/* <Stars /> */}
                    <Physics gravity={[0, -30, 0]}>
                        <Ground />
                        <Player />
                        {/* <Cube position={[10, 0.5, 0]} /> */}
                        {/* <Cubes /> */}
                        <Statue position={[0, 0, -110]} rotation-y={-Math.PI} />
                        <Hall1 position={[50, -0.5, -50]} rotation-y={-Math.PI / 2} />
                        {/* <Ship position={[50, 10, 50]} /> */}
                        <Whale position={[0, 1, -10]} />
                        <Debug />
                    </Physics>
                    <PointerLockControls />

                    {/* 测试用视角 */}


                </Canvas>
            </KeyboardControls>
        </>
    )

}