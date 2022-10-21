import React, { Suspense } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Test0 from "../pages/test0/test0";

export default function Index() {
    return (
        <>
            <Canvas style={{ width: '100%', height: '100vh', }}>
                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>
                    <Test0 />
                </Suspense>
            </Canvas>
        </>
    );
}