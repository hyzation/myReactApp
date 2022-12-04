import {
    Canvas
} from "@react-three/fiber";
import Test3 from "../pages/test3/test3";
import { Suspense } from "react";


/**
 * 3D渲染页面
 * @returns {JSX.Element}
 * @constructor
 */
export default function Home() {
    // const [planetFrameState, planetFrameDispatch] = useReducer(reducer, '', init);

    return (
        <Suspense>
            <div style={{ width: '100vw', height: '100vh', background: 'rgb(221,223,224)', }}>
                {/* <Canvas style={{ width: '100vw', height: '100vh' }}
          camera={{ position: [10, 10, 10], zoom: 10, }}
          shadows
          dpr={[2, 2]}
        > */}
                <Canvas
                    // style={{ width: '100vw', height: '100vh' }}
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [0, 15, 80], fov: 20 }}
                >
                    <Test3 />
                </Canvas>
            </div>
        </Suspense>
    );
}
