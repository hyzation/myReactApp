import { useState, setStatue, useEffect } from 'react'

export default function Index() {
    const click = (data) => {
        // console.log(data);
        return ()=>{
            console.log(data);
        }
    }

    return (
        <button onClick={click('EEE')} >click</button>
    )
}