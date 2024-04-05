import { UserOutlined } from '@ant-design/icons'
import { Card, Divider, Space, Typography } from 'antd'

const ListCard = () => {
  return (
    <>
      <Space direction='horizontal' size={'middle'}>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Tổng ứng viên</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>10</Typography.Title>
        </Card>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>CV ứng tuyển</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>2</Typography.Title>
        </Card>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>CV đã duyệt</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>3</Typography.Title>
        </Card>
        <Card style={{ padding: '0 5rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Lượt mở CV ứng tuyển</small>
          </Space>
          <Typography.Title style={{ textAlign: 'center' }}>18</Typography.Title>
        </Card>
      </Space>
      <Divider />
    </>
  )
}

export default ListCard
