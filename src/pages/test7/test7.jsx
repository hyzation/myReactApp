import { useState, setStatue, useEffect } from 'react'

export default function Index() {
    const click = (data) => {
        // console.log(data);
        return () => {
            console.log(data);
        }
    }

    const list = [
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
        'ttt',
    ]

    return (
        // <button onClick={click('EEE')} >click</button>
        <>
            {
                list.map((item, index) => {
                    return <p key={index}>{index+1} . {item}</p>
                })
            }
        </>
    )
}