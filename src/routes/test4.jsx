import React, { Suspense } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Test4 from "../pages/test4/test4";


export default function Index() {
    return (
        <>
           <Canvas style={{ width: '100%', height: '100vh', }}>
                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>
                    <Test4 />
                </Suspense>
            </Canvas>
        </>
    );
}