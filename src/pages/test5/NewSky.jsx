import { Suspense } from "react";
import { useThree } from "@react-three/fiber";
import {
    CubeTextureLoader,
} from "three";

export default function NewSky() {
    const Sky = () => {
        const { scene } = useThree();
        const loader = new CubeTextureLoader();
        // const texture = loader.load([
        //     "/image/space/right.jpg",
        //     "/image/space/left.jpg",
        //     "/image/space/top.jpg",
        //     "/image/space/bottom.jpg",
        //     "/image/space/front.jpg",
        //     "/image/space/back.jpg",
        // ]);
        const texture = loader.load([
            "/image/space2/right.jpg",
            "/image/space2/left.jpg",
            "/image/space2/right.jpg",
            "/image/space2/bottom.jpg",
            "/image/space2/front.jpg",
            "/image/space2/back.jpg",
        ]);
        scene.background = texture;
        return null;
    }
    return (
        <>
            <Suspense fallback={null}>
                <Sky />
            </Suspense>
        </>
    )
}
