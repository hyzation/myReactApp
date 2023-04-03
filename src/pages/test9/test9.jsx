import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

function Box(props) {
    const mesh = useRef();
    const [position, setPosition] = useState(props.position);
    const [rotation, setRotation] = useState(props.rotation);
    const { color } = useSpring({
        color: props.color,
        from: { color: "#fff" }
    });

    useFrame((mesh) => {
    //     const lerpFactor = 0.1;
    //     console.log(mesh.camera.rotation);
    //     console.log(props.position);
    //     mesh.camera.position.lerp(props.position, lerpFactor);
    //     // mesh.camera.rotation.lerp(props.rotation, lerpFactor);
    //     // mesh.current.position.copy(newPosition);
    //     // mesh.current.rotation.copy(newRotation);
    });

    return (
        <a.mesh ref={mesh} position={position} rotation={rotation} onClick={props.onClick}>
            <a.boxBufferGeometry attach="geometry" args={props.args} />
            <a.meshStandardMaterial attach="material" color={color} />
        </a.mesh>
    );
}

function App() {
    const cameraRef = useRef();
    const [colorIndex, setColorIndex] = useState(0);

    const colors = ["red", "yellow", "blue"];
    const positions = [
        new THREE.Vector3(10, 10, 10),
        new THREE.Vector3(10, 10, 10),
        new THREE.Vector3(10, 10, 10)
    ];

    const handleClick = () => {
        setColorIndex((colorIndex + 1) % 3);
    };

    const { color } = useSpring({
        color: colors[colorIndex],
        from: { color: "#fff" }
    });

    return (
        <Canvas camera={{ position: [0, 0, 5] }} style={{ 'height': '100vh', }}>
            <Box
                position={positions[colorIndex]}
                // rotation={[0, 0, 0]}
                args={[1, 1, 1]}
                color={color}
                onClick={handleClick}
            />
            <mesh ref={cameraRef}>
                <perspectiveCamera
                    position={[10, 10, 5]}
                    fov={2000}
                    aspect={window.innerWidth / window.innerHeight}
                    // near={0.1}
                    far={1000}
                />
            </mesh>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls
                makeDefault
                target={[0, 0, 0]}
                camera={cameraRef.current}
                minAzimuthAngle={0}
                enableZoom={true}
                enablePan={true}
            />
        </Canvas>
    );
}

export default App;
