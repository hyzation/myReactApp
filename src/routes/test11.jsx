import React, { useState } from 'react'
import Test11 from "../pages/test11/test11";


export default function Index() {
    const [ready, set] = useState(false)

    return (
        <>
            {/* <Test11 /> */}
            {ready && <Test11 />}
            <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${ready && 'clicked'}`}>
                <div className="stack">
                    <button onClick={() => set(true)}>▶️</button>
                </div>
            </div>
        </>
    );
}