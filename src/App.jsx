import './App.css'


const list = [
  { name: '测试名', tag: 'desc...', },
  { name: '测试名', tag: 'desc...', },
]

export default function App() {
  return (
    <>
      <div className='appBox'>
        {
          list.map((item, index) => {
            return <div className='appTag' key={index}>
              <div>{item.name}</div>
            </div>
          })
        }
      </div>
    </>
  );
}
