import { UserOutlined } from '@ant-design/icons'
import { Card, Divider, Space, Typography } from 'antd'

const ListCard = () => {
  return (
    <>
      <Space direction='horizontal'>
        <Card style={{ padding: '0 3rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Total User</small>
          </Space>
          <Typography.Title>1234</Typography.Title>
        </Card>
        <Card style={{ padding: '0 3rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Total User</small>
          </Space>
          <Typography.Title>1234</Typography.Title>
        </Card>
      </Space>
      <Divider />
    </>
  )
}

export default ListCard
