
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Police(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/model/test/police/police.glb");
    const { actions } = useAnimations(animations, group);
    return (
        <group ref={group} {...props} dispose={null}>

        </group>
    );
}

useGLTF.preload("/model/test/police/police.glb");
