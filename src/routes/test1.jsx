import React, { Suspense } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Test1 from "../pages/test1/test1";


export default function Index() {
    return (
        <>
            <Canvas style={{ width: '100vw', height: '100vh', }}
                camera={{ position: [200, 280, 0] }}>
                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>
                    <Test1 />
                </Suspense>
            </Canvas>
        </>
    );
}