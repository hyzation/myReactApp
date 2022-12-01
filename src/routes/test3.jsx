import React, { Suspense } from "react";
import { Html, Bounds, BakeShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Test3 from "../pages/test3/test3";


export default function Index() {
    return (
        <>
            <Canvas style={{ width: '100vw', height: '100vh' }}
                camera={{ position: [10, 10, 10], zoom: 10, }}
                // orthographic
                shadows
                dpr={[2, 2]}
            >





                <Suspense fallback={<Html style={{
                    color: '#000000',
                    width: '100px',
                }} center>加载中...</Html>}>

                    {/* <color attach="background" args={['#252530']} /> */}
                    {/* <ambientLight intensity={0.01} /> */}
                    {/* <hemisphereLight intensity={0.125} color="#8040df" groundColor="red" /> */}
                    {/* <spotLight castShadow color="orange" intensity={2} position={[-50, 50, 40]} angle={0.25} penumbra={1} shadow-mapSize={[128, 128]} shadow-bias={0.00005} /> */}


                    {/* <Bounds fit clip observe margin={1}> */}
                    <Test3 scale={0.1}/>
                    {/* </Bounds> */}



                </Suspense>
            </Canvas>
        </>
    );
}