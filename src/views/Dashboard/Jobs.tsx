import { Button, DatePicker, Form, Input, Modal, Select, Slider, Space, Table } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import { useEffect, useState } from 'react'
import Cities from '@/data/cities.json'
import ListCard from '@/components/ListCard'

const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [job, setJob] = useState([])

  useEffect(() => {
    const id = window.sessionStorage.getItem('enterpriseId') || ''
    getList(id)
  }, [])

  const getList = (id: string) => {
    fetch(`${import.meta.env.VITE_BASE_API_URL}/job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setJob(data.data)
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <ListCard />

      <Space direction='vertical' size={'middle'} style={{ display: 'flex' }}>
        <Button type='primary' onClick={showModal}>
          New job
        </Button>
        <Table
          dataSource={job}
          pagination={{ pageSize: 6 }}
          rowKey='id'
          columns={[
            {
              dataIndex: 'title',
              title: 'Title',
              key: 'title'
            },
            {
              dataIndex: 'skills',
              title: 'Skills',
              key: 'skills'
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
          <Form.Item label='Location'>
            <Select style={{ width: 120 }} defaultValue='An Giang'>
              {Cities?.map((item) => (
                <Select.Option value={item.name} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Position'>
            <Select
              defaultValue='Fulltime'
              style={{ width: 120 }}
              options={[
                { value: 'Fulltime', label: 'Fulltime' },
                { value: 'Part time', label: 'Parttime' },
                { value: 'Freelancer', label: 'Freelancer' }
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
