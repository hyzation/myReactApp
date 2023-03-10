import { useState } from "react";
import "./test1.css";

import Controls from './controls'

// 获取随机颜色
function num() {
    let num = new String()
    for (let i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10)
    }
    return '#' + num
}

let world = []
for (let i = 0; i < 50; i++) {
    console.log(num());
    const x = 1;
    const y = 1;

    world.push(
        <mesh key={i}
            // position={[Math.random() * 1600 - 800, 0, Math.random() * 1600 - 800]}
            position={[i * 20, 0, i * 20]}
            scale={[30, 20, 60]}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />
            <meshPhongMaterial attach="material" color={num()} flatShading={true} />
        </mesh>
    )
}

function Plane() {
    return (
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry attach="geometry" args={[1800, 1800]} ref={ref => ref && ref.translate(0, 0.5, 0)} />
            <meshPhongMaterial attach="material" color="rgb(19,93,270)" flatShading={true} />
        </mesh>
    )
}

export default function Index(props) {

    const [screenSpacePanning, toggle] = useState(false)

    return (
        <>
            {/* <label className="checkbox">
                screenSpacePanning <input type="checkbox" onChange={() => toggle(!screenSpacePanning)} />
            </label> */}
            {/* <Canvas camera={{ position: [400, 200, 0] }}> */}
            <pointLight position={[5, 20, 5]} />
            <Controls screenSpacePanning={screenSpacePanning} />
            {/* <fog attach="fog" args={['#ff6161', 0.002, 1000]} /> */}
            <directionalLight position={[1, 1, 1]} color="#ad0071" />
            <directionalLight position={[-1, -1, -1]} color="#ffd738" />
            {/* <ambientLight color="#444444" /> */}
            {world}
            <Plane />
            {/* </Canvas> */}
        </>
    )
}