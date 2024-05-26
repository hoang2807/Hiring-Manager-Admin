import { UserOutlined } from '@ant-design/icons'
import { Card, Divider, Space, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'

const ListCard = () => {
  const [accept, setAccept] = useState(0)
  const [reject, setReject] = useState(0)
  const [notSeen, setNotSeen] = useState(0)
  const [total, setTotal] = useState(0)
  const [above, setAbove] = useState(0)

  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const id = window.sessionStorage.getItem('enterpriseId') || ''
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/${id}`)).json()

      calculate(data?.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        errorNotification(error.message)
      }
    }
  }

  const calculate = (data) => {
    let SUITABLE = 0
    let NOT_SUITABLE = 0
    let NOT_SEEN = 0
    let ABOVE = 0
    for (let i = 0; i < data.length; ++i) {
      if (data[i].score > 8) {
        ++ABOVE
      }
      if (data[i].status === 'SUITABLE') {
        ++SUITABLE
        continue
      }
      if (data[i].status === 'NOT_SUITABLE') {
        ++NOT_SUITABLE
        continue
      }
      if (data[i].status === 'NOT_SEEN') {
        ++NOT_SEEN
        continue
      }
    }

    setNotSeen(NOT_SEEN)
    setAccept(SUITABLE)
    setReject(NOT_SUITABLE)
    setTotal(data.length)
    setAbove(ABOVE)
  }

  const errorNotification = (message: string) => {
    api.error({
      message: `Error`,
      description: message
    })
  }

  return (
    <>
      <Space direction='horizontal' size={'middle'}>
        {contextHolder}
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Tổng ứng viên</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>{total}</Typography.Title>
        </Card>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>CV đã duyệt</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>{accept + reject}</Typography.Title>
        </Card>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>CV có điểm lớn hơn 8</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>{above}</Typography.Title>
        </Card>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>CV chưa xem</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>{notSeen}</Typography.Title>
        </Card>
      </Space>
      <Divider />
    </>
  )
}

export default ListCard
