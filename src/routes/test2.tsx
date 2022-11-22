import React, { Suspense } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Test2 from "../pages/test2/test2";


export default function Index() {
    return (
        <>
            <Canvas style={{ width: '100vw', height: '100vh', }}
                camera={{ position: [200, 280, 0] }}>
                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>
                    <Test2 />
                </Suspense>
            </Canvas>
        </>
    );
}