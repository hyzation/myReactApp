import './test8.css'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { useState, useEffect } from 'react'

export const Menu = () => {
    const [showmenu, setShowMenu] = useState(0)

    const snap = useSnapshot(state)

    const angle = [
        { name: '回到主页', pos: state.originPos, },
        { name: '切换主驾', pos: [3, 3, 3], },
        { name: '切换副驾', pos: [-10, 10, -10], },
    ]

    useEffect(() => {
        if (showmenu != 2) {
            state.anime = null
        }
        if (showmenu === 4) {
            state.campos = [0, 5, 0]
        }
    }, [showmenu]);

    return (
        <>
            {/* <div className='uibox'> */}
            {/* 底部常驻四栏目 */}
            <div className='uibox_table'>
                <div onClick={() => { showmenu == 1 ? setShowMenu(0) : setShowMenu(1) }}>灯光</div>
                <div onClick={() => { showmenu == 2 ? setShowMenu(0) : setShowMenu(2) }}>操控</div>
                <div onClick={() => { showmenu == 3 ? setShowMenu(0) : setShowMenu(3) }}>配色</div>
                <div onClick={() => { setShowMenu(4) }}>内饰</div>
            </div>

            {/* 操控 */}
            <div className='control_menu' style={{ 'opacity': showmenu == 2 ? '1' : '0', 'zIndex': showmenu == 2 ? '999' : '0', }}>
                <div className='control_tab' onClick={() => { state.anime = 0 }}>动画1</div>
                <div className='control_tab' onClick={() => { state.anime = 1 }}>动画2</div>
                <div className='control_tab' onClick={() => { state.anime = 2 }}>动画3</div>
                <div className='control_tab' onClick={() => { state.anime = 3 }}>动画4</div>
                <div className='control_tab' onClick={() => { state.anime = 4 }}>动画5</div>
            </div>

            {/* 选配色 */}
            <div className='color_menu' style={{ 'opacity': showmenu == 3 ? '1' : '0', 'zIndex': showmenu == 3 ? '999' : '0', }}>
                {snap.colors.map((color) => (
                    <div key={color} className={`color_menu_circle`} style={{ 'background': color }} onClick={() => (state.color = color)}></div>
                ))}
            </div >

            {/* 切换位置 */}
            <div className='angle_menu' style={{ 'opacity': showmenu == 4 ? '1' : '0', 'zIndex': showmenu == 4 ? '999' : '0', }}>
                {
                    angle.map((item, index) => {
                        return <div className='angle_tab' key={index} onClick={() => { state.campos = item.pos; state.canLerp = true }}>{item.name}</div>
                    })
                }
            </div>



            {/* </div> */}
        </>
    )
}