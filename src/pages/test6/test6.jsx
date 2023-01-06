import { useState } from 'react'
// 引入我们定义的第一步的文件
import myContext from '../../utils/createContext'
import { Child } from './Child.jsx'
// 使用myContext.Provider包裹我们需要传值的组件 value属性是我们要传的值
// industryList为我要传的值 在这里我传递的是一个Object 里面包含一个industryList
export default function Index() {
    // const industryList = { label: '1', }
    const [industryList, setindustryList] = useState(1)

    const plus = () => {
        setindustryList(industryList + 1)
    }
    return (
        <div>
            <span>我是顶层父元素</span>
            <myContext.Provider value={{ industryList }}>
                <button onClick={plus}>+1</button>
                <Child />
                {industryList}
            </myContext.Provider>
        </div>
    )
}