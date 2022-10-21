import './home.css'

const list = [
    { name: '测试0', tag: 'desc...', src: '/test0', },
    { name: '测试1', tag: 'desc...', src: '/test1' },
]

export default function Home() {
    return (
        <div className='appBox'>
            {
                list.map((item, index) => {
                    return <a className='appTag' key={index} href={item.src}>
                        <div>{item.name}</div>
                    </a>
                })
            }
        </div>
    );
}