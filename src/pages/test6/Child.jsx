// 同样需要引入我们定义的第一步的文件
import myContext from '../../utils/createContext'
import { GrandSon } from './GrandSon'
import React, { useContext } from 'react'
// 使用useContext包裹 最终使用解构拿到我们需要的值
export const Child = () => {
    const { industryList } = useContext(myContext)
    return (
        <>
            {/* <div>我是子元素（我也可以是子的子元素）</div>
            <div>{industryList.label}</div> */}
            <GrandSon />
        </>
    )
}
