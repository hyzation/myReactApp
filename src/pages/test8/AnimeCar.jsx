
import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useSnapshot } from 'valtio'
import { state } from './store'
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import * as THREE from 'three'

export function AnimeCar(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/model/test/anime_car/car.glb");
    const { actions, names } = useAnimations(animations, group);
    const snap = useSnapshot(state)

    // const dummy = new THREE.Vector3()
    // const lookAtPos = new THREE.Vector3()
    const [position, setPos] = useState(snap.campos)
    useFrame((mesher) => {
        const step = 0.01
        mesher.camera.position.lerp({ x: position[0], y: position[1], z: position[2] }, step)
    })
    useEffect(() => {
        setPos(snap.campos)
    }, [snap.campos]);

    // 动画
    useEffect(() => {
        if (snap.anime != null) {
            // actions[names[snap.anime]].setLoop(THREE.LoopOnce)
            actions[names[snap.anime]].loop = THREE.LoopOnce
            // actions[names[snap.anime]].repetitions = false
            actions[names[snap.anime]].reset().fadeIn(0.5).play()
            console.log(actions[names[snap.anime]]);
            return () => actions[names[snap.anime]].stop()
        }
    }, [actions, names, snap.anime]);

    // useSpring
    const [springcolor, setspringcolor] = useState("#000")
    useEffect(() => {
        setspringcolor(snap.color)
        console.log(snap.color);
    }, [snap.color]);

    const { color } = useSpring({
        color: springcolor,
        // from: { color: "#000" },
        config: {
            duration: 800,
        }
    });


    // useEffect(() => {
    //     if (snap.anime) {
    //         actions[names].reset().fadeIn(0.5).play()
    //     } else {
    //         actions[names].reset().fadeIn(0.5).play()
    //     }
    // }, [actions, names, snap.anime]);
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group
                    name="Sketchfab_model"
                    rotation={[0, -Math.PI, 0]}
                    scale={0.38}
                >
                    <group
                        name="b7442e26e25842a8b9888e6c536fe8d3fbx"
                        // rotation={[Math.PI / 2, 0, 0]}
                        scale={0.01}
                    >
                        <group name="Object_2">
                            <group name="RootNode">
                                <group name="Car" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                                    <group name="Object_5">
                                        <primitive object={nodes._rootJoint} />
                                        <group
                                            name="Object_77"
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={100}
                                        />
                                        <a.skinnedMesh
                                            name="Object_78"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_78.geometry}
                                            material={materials.Mat_Robot}
                                            skeleton={nodes.Object_78.skeleton}
                                        >
                                            <a.meshStandardMaterial
                                                attach="material"
                                                color={color}
                                                roughness={0.1}
                                                metalness={0.9}
                                            />
                                        </a.skinnedMesh>
                                    </group>
                                </group>
                                <group
                                    name="Msh_Carro"
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/car.glb");
