import { Suspense } from "react";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
    CubeTextureLoader,
} from "three";

// 此方法会让场景曝光，暂时找不到原因

// export default function NewSky() {
//     const Sky = () => {
//         const { scene } = useThree();
//         const loader = new CubeTextureLoader();
//         const texture = loader.load([
//             "/image/space2/right.jpg",
//             "/image/space2/left.jpg",
//             "/image/space2/right.jpg",
//             "/image/space2/bottom.jpg",
//             "/image/space2/front.jpg",
//             "/image/space2/back.jpg",
//         ]);
//         scene.background = texture;
//         return null;
//     }
//     return (
//         <>
//             <Suspense fallback={null}>
//                 <Sky />
//             </Suspense>
//         </>
//     )
// }

export default function NewSky() {
    return (
        <>
            <Suspense fallback={null}>
                <Environment
                    background={true} // can be true, false or "only" (which only sets the background) (default: false)
                    files={[
                        "/image/space2/right.jpg",
                        "/image/space2/left.jpg",
                        "/image/space2/bottom.jpg",
                        "/image/space2/bottom.jpg",
                        "/image/space2/front.jpg",
                        "/image/space2/back.jpg",
                    ]}
                    preset={null}
                    scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
                    encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
                />
            </Suspense>
        </>
    )
}
