import { Button, Card, Col, Divider, Row, Space, Table, Tag, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/es/button/button-group'
import { faker } from '@faker-js/faker'

const generateData = () => {
  const data = []

  for (let i = 0; i < 32; ++i) {
    data.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone_number: faker.phone.number(),
      gender: faker.person.sex(),
      address: faker.location.streetAddress(),
      status: Math.random() > 0.5 ? true : false
    })
  }

  return data
}

const data = generateData()

const Home = () => {
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

      <Row
        gutter={10}
        style={{
          marginTop: 10
        }}
      >
        <Col span={22}>
          <Table
            dataSource={data}
            rowKey='id'
            columns={[
              {
                dataIndex: 'id',
                title: 'ID'
                // key: 'id'
              },
              {
                dataIndex: 'name',
                title: 'Name'
                // key: 'name'
              },
              {
                dataIndex: 'email',
                title: 'Email'
                // key: 'email'
              },
              {
                dataIndex: 'phone_number',
                title: 'Phone Number'
                // key: 'phone_number'
              },
              {
                dataIndex: 'gender',
                title: 'Gender'
                // key: 'gender'
              },
              {
                dataIndex: 'address',
                title: 'Address'
                // key: 'address'
              },
              {
                dataIndex: 'status',
                title: 'Status',
                // key: 'status',
                render: (val) => (val ? <Tag>Active</Tag> : <Tag>Not Active</Tag>)
              },
              {
                dataIndex: 'action',
                title: 'Action',
                // key: 'action',
                render: () => (
                  <ButtonGroup>
                    <Button>Edit</Button>
                    <Button type='primary' danger>
                      Delete
                    </Button>
                  </ButtonGroup>
                )
              }
            ]}
          />
        </Col>
      </Row>
    </>
  )
}

export default Home
