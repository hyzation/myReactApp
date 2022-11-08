import './home.css'

const num = 5
const list = () => {
    let newlist = []
    for (var i = 0; i <= num; i++) {
        let obj = {
            name: '测试' + i,
            src: '/test' + i,
        }
        newlist.push(obj)
    }
    return newlist
}

export default function Home() {
    return (
        <div className='appBox'>
            {
                list().map((item, index) => {
                    return <a className='appTag' key={index} href={item.src}>
                        <div className='appTagBox'>
                            <div>{item.name}</div>
                        </div>
                    </a>
                })
            }


        </div>
    );
}