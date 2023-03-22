import './test8.css'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { useState, useEffect } from 'react'

export const Menu = () => {
    const [showmenu, setShowMenu] = useState(0)
    const [isanime, setIsanime] = useState(false)

    const snap = useSnapshot(state)

    useEffect(() => {
        state.anime = isanime
    }, [isanime]);
    return (
        <>
            {/* <div className='uibox'> */}
            {/* 底部常驻四栏目 */}
            <div className='uibox_table'>
                <div>灯光</div>
                <div onClick={() => { showmenu == 2 ? setShowMenu(0) : setShowMenu(2) }}>操控</div>
                <div onClick={() => { showmenu == 3 ? setShowMenu(0) : setShowMenu(3) }}>配色</div>
                <div>内饰</div>
            </div>

            {/* 操控 */}
            <div className='control_menu' style={{ 'opacity': showmenu == 2 ? '1' : '0', 'zIndex': showmenu == 2 ? '999' : '0', }}>
                <div onClick={() => { setIsanime(!isanime) }}>CLICK</div>
            </div>

            {/* 选配色 */}
            <div className='color_menu' style={{ 'opacity': showmenu == 3 ? '1' : '0', 'zIndex': showmenu == 3 ? '999' : '0', }}>
                {snap.colors.map((color) => (
                    <div key={color} className={`color_menu_circle`} style={{ 'background': color }} onClick={() => (state.color = color)}></div>
                ))}
            </div >



            {/* </div> */}
        </>
    )
}