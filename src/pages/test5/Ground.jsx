import * as THREE from "three"
import { useTexture, MeshReflectorMaterial } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import grass from "./assets/sand.jpg"

export default function Ground(props) {
    const texture = useTexture(grass)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    return (
        <RigidBody {...props} type="fixed" colliders={false}>
            <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[800, 800]} />
                {/* <meshStandardMaterial
                    map={texture}
                    map-repeat={[50, 50]}
                // color="green"
                /> */}
                <MeshReflectorMaterial
                    // blur={[300, 100]}
                    resolution={2048}
                    mixBlur={0}
                    mixStrength={1}
                    roughness={1}
                    depthScale={20}
                    minDepthThreshold={2}
                    maxDepthThreshold={1.9}
                    // color="rgb(20,23,70)"
                    color="#333"
                    metalness={3}
                />
                {/* <meshStandardMaterial
                    color="grey"
                /> */}
            </mesh>
            <CuboidCollider args={[400, 1, 400]} position={[0, 0, 0]} />
        </RigidBody>
    )
}
