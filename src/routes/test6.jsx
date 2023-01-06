import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import Test6 from "../pages/test6/test6";


export default function Index() {
    return (
        <>
            <Test6 />
        </>
    );
}