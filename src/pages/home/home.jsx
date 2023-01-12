import './home.css'



// const list = () => {
//     let newlist = []
//     for (var i = 0; i <= num; i++) {
//         let obj = {
//             name: '测试' + i,
//             src: '/test' + i,
//         }
//         newlist.push(obj)
//     }
//     return newlist
// }

export default function Home() {

    const list = [
        { name: '单一物体', src: '/test0', },
        { name: '地图查看', src: '/test1', },
        { name: '光照，clone，阴影', src: '/test2', },
        { name: 'cameraShake', src: '/test3', },
        { name: '平滑切换机位（lerp），阴影', src: '/test4', },
        { name: '第一人称', src: '/test5', },
        { name: '组件传值', src: '/test6', },
        { name: '测试', src: '/test7', },
    ]

    return (
        <>
            <div className='appBox'>
                {
                    list.map((item, index) => {
                        return <a className='appTag' key={index} href={item.src}>
                            <div className='appTagBox'>
                                <div>{item.name}</div>
                            </div>
                        </a>
                    })
                }
            </div>
        </>
    );
}