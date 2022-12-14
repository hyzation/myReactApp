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
                <planeGeometry args={[500, 500]} />
                {/* <meshStandardMaterial
                    map={texture}
                    map-repeat={[50, 50]}
                // color="green"
                /> */}
                <MeshReflectorMaterial
                    // blur={[300, 100]}
                    resolution={1024}
                    mixBlur={0}
                    mixStrength={1}
                    roughness={10}
                    depthScale={2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="transparent"
                    metalness={1}
                />
            </mesh>
            <CuboidCollider args={[250, 0, 250]} position={[0, 0, 0]} />
        </RigidBody>
    )
}
