import { Avatar } from 'antd'
import { Header as AntdHeader } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
// import { ChildrenProps as Props } from '@/type'

function Header() {
  const [img, setImg] = useState('')
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    const enterpriseId = window.sessionStorage.getItem('enterpriseId')

    fetch(`${import.meta.env.VITE_BASE_API_URL}/enterprise/${enterpriseId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setImg(data?.data.image.replace('upload/', ''))
      })
      .catch((error) => console.error(error))
  }
  return (
    <AntdHeader
      style={{
        backgroundColor: 'white',
        position: 'relative'
      }}
    >
      {/* <div className='brand'>{children}</div> */}
      {/* <img src={`http://localhost:3000/public/${img}`} alt='avatar' /> */}
      <Avatar
        src={`http://localhost:3000/public/${img}`}
        size='large'
        style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)' }}
      />
    </AntdHeader>
  )
}

export default Header
