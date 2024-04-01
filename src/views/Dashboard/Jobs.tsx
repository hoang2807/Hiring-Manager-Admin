import { Button, Card, DatePicker, Divider, Form, Input, Modal, Select, Slider, Space, Table, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/es/button/button-group'
import { faker } from '@faker-js/faker'
import { useState } from 'react'

const generateData = () => {
  const data = []

  for (let i = 0; i < 32; ++i) {
    data.push({
      key: i,
      name: faker.person.fullName(),
      title: faker.person.jobTitle(),
      position: faker.person.jobArea(),
      location: faker.location.city()
    })
  }

  return data
}

const data = generateData()

const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Space direction='horizontal'>
        <Card style={{ padding: '0 3rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Total Job</small>
          </Space>
          <Typography.Title>1234</Typography.Title>
        </Card>
        <Card style={{ padding: '0 3rem' }}>
          <Space direction='horizontal'>
            <UserOutlined />
            <small>Total Job</small>
          </Space>
          <Typography.Title>1234</Typography.Title>
        </Card>
      </Space>
      <Divider />
      <Space direction='vertical' size={'middle'} style={{ display: 'flex' }}>
        <Button type='primary' onClick={showModal}>
          New job
        </Button>
        <Table
          dataSource={data}
          pagination={{ pageSize: 8 }}
          rowKey='name'
          columns={[
            {
              dataIndex: 'name',
              title: 'Name',
              key: 'name'
            },
            {
              dataIndex: 'title',
              title: 'Title',
              key: 'email'
            },
            {
              dataIndex: 'position',
              title: 'Position',
              key: 'position'
            },
            {
              dataIndex: 'location',
              title: 'Location',
              key: 'location'
            },
            {
              dataIndex: 'action',
              title: 'Action',
              key: 'action',
              render: () => (
                <ButtonGroup>
                  <Button>Edit</Button>
                  <Button type='primary' danger>
                    Delete
                  </Button>
                </ButtonGroup>
              ),
              align: 'center'
            }
          ]}
        />
      </Space>
      <Modal title='New Job' open={isModalOpen} onCancel={handleCancel} width={800}>
        <Form labelCol={{ span: 4 }}>
          <Form.Item label='Title'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='Position'>
            <Select
              defaultValue='lucy'
              style={{ width: 120 }}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' }
              ]}
            />
          </Form.Item>
          <Form.Item label='Location'>
            <Select
              defaultValue='lucy'
              style={{ width: 120 }}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' }
              ]}
            />
          </Form.Item>
          <Form.Item label='Job description'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Job requirements'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Working time'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='Deadline date'>
            <DatePicker needConfirm />
          </Form.Item>
          <Form.Item label='Salary'>
            <Slider range defaultValue={[20, 50]} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Jobs
