// 同样需要引入我们定义的第一步的文件
import myContext from '../../utils/createContext'
import React, { useContext } from 'react'
// 使用useContext包裹 最终使用解构拿到我们需要的值
export const GrandSon = () => {
    const { industryList } = useContext(myContext)
    const minus = () => {
        
    }
    return (
        <>
            <div>（我是子的子元素）</div>
            <div>{industryList}</div>
            <button onClick={minus}>-1</button>
        </>
    )
}
