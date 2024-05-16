import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Popconfirm,
  notification
} from 'antd'
import type { PopconfirmProps } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import { useEffect, useState } from 'react'
import Cities from '@/data/cities.json'
import ListCard from '@/components/ListCard'
import dayjs from 'dayjs'

const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('An Giang')
  const [position, setPosition] = useState('Fulltime')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [salary, setSalary] = useState('')
  const [skills, setSkills] = useState('')
  const [benefits, setBenefits] = useState('')
  const [job, setJob] = useState([])
  const [jobId, setJobId] = useState(0)
  const [mode, setMode] = useState('add')

  const [api, contextHolder] = notification.useNotification()

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    handleDelete(e)
  }

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e)
  }

  const resetState = () => {
    setTitle('')
    setLocation('An Giang')
    setPosition('Fulltime')
    setDescription('')
    setRequirements('')
    setTime('')
    setDate('')
    setSalary('')
    setSkills('')
    setBenefits('')
  }

  const showModal = () => {
    setIsModalOpen(true)
    resetState()
  }

  const showModalEdit = (id: string) => {
    setIsModalOpen(true)
    fetch(`http://localhost:3000/api/job/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTitle(data.data.title)
        setJobId(data.data.id)
        setLocation(data.data.location)
        setPosition(data.data.position)
        setDescription(data.data.job_description)
        setRequirements(data.data.job_requirements)
        setSkills(data.data.skills)
        setTime(data.data.working_time)
        setBenefits(data.data.benefits)
        setDate(data.data.deadline_date)
        setSalary(data.data.salary)
        setMode('edit')
        getList(sessionStorage.getItem('enterpriseId') || '')
      })
      .catch((error) => console.log(error))
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    resetState()
  }

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  }

  const successNotification = (message: string) => {
    api.success({
      message: `success`,
      description: message
    })
  }

  const errorNotification = (message: string) => {
    api.error({
      message: `Error`,
      description: message
    })
  }

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3000/api/job/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const removeItem = job?.filter((i: { id: number }) => {
          return i.id !== data.data.id
        })
        successNotification('Delete success')
        setJob(removeItem)
      })
      .catch((error) => errorNotification(error.message))
  }

  const handleOk = () => {
    if (mode === 'add')
      fetch('http://localhost:3000/api/job', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          job_description: description,
          job_requirements: requirements,
          position,
          salary,
          working_time: time,
          location,
          deadline_date: date,
          benefits,
          skills,
          enterpriseName: 'Viettel',
          enterpriseId: parseInt(sessionStorage.getItem('enterpriseId'))
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          getList(sessionStorage.getItem('enterpriseId'))
          setIsModalOpen(false)
          successNotification('Create job success')
        })
        .catch((error) => errorNotification(error.message))
    else {
      fetch('http://localhost:3000/api/job', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: jobId,
          title,
          job_description: description,
          job_requirements: requirements,
          position,
          salary,
          working_time: time,
          location,
          deadline_date: date,
          benefits,
          skills
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          getList(sessionStorage.getItem('enterpriseId'))
          setIsModalOpen(false)
          setMode('add')
          successNotification('Create job success')
        })
        .catch((error) => errorNotification(error.message))
    }
    resetState()
  }

  useEffect(() => {
    const id = window.sessionStorage.getItem('enterpriseId') || ''
    getList(id)
  }, [])

  const getList = (id: string) => {
    fetch(`${import.meta.env.VITE_BASE_API_URL}/job/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.data)
      })
      .catch((error) => {
        errorNotification(error.message)
      })
  }
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

  return (
    <>
      {contextHolder}
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
              render: (item, record) => (
                <ButtonGroup>
                  <Button onClick={() => showModalEdit(record.id)}>Edit</Button>
                  {/* <Button type='primary' danger onClick={() => handleDelete(record.id)}>
                    Delete
                  </Button> */}
                  <Popconfirm
                    title='Delete the task'
                    description='Are you sure to delete this job?'
                    onConfirm={() => confirm(record.id)}
                    onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button type='primary' danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </ButtonGroup>
              ),
              align: 'center'
            }
          ]}
        />
      </Space>
      <Modal title='New Job' open={isModalOpen} onCancel={handleCancel} onOk={handleOk} width={800}>
        <Form labelCol={{ span: 4 }}>
          <Form.Item label='Title'>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label='Location'>
            <Select
              style={{ width: 120 }}
              defaultValue={location}
              onChange={(e) => {
                console.log(e)
                setLocation(e)
              }}
            >
              {Cities?.map((item) => <Select.Option key={item.name}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label='Position'>
            <Select
              defaultValue={position}
              style={{ width: 120 }}
              options={[
                { value: 'Fulltime', label: 'Fulltime' },
                { value: 'Part time', label: 'Parttime' },
                { value: 'Freelancer', label: 'Freelancer' }
              ]}
              onChange={(e) => setPosition(e)}
            />
          </Form.Item>
          <Form.Item label='Job description'>
            <Input.TextArea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value.replace(/\n/g, ';'))}
            />
          </Form.Item>
          <Form.Item label='Job requirements'>
            <Input.TextArea
              rows={6}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value.replace(/\n/g, ';'))}
            />
          </Form.Item>
          <Form.Item label='Benefits'>
            <Input.TextArea
              rows={6}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value.replace(/\n/g, ';'))}
            />
          </Form.Item>
          <Form.Item label='Skills'>
            <Input onChange={(e) => setSkills(e.target.value)} value={skills} />
          </Form.Item>
          <Form.Item label='Working time'>
            <Input onChange={(e) => setTime(e.target.value)} value={time} />
          </Form.Item>
          <Form.Item label='Deadline date'>
            <DatePicker onChange={onChangeDate} defaultValue={dayjs(date, 'YYYY/MM/DD')} format={'YYYY/MM/DD'} />
          </Form.Item>
          <Form.Item label='Salary'>
            <Input onChange={(e) => setSalary(e.target.value)} value={salary} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Jobs
