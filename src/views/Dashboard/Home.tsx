import {
  Button,
  Table,
  Tag,
  Modal,
  Avatar,
  Divider,
  Flex,
  Card,
  Dropdown,
  MenuProps,
  notification,
  Slider,
  Typography
} from 'antd'
import { useEffect, useState } from 'react'
import ListCard from '@/components/ListCard'
import { CheckCircleOutlined, GoogleOutlined, PhoneOutlined, SyncOutlined } from '@ant-design/icons'
import Copy from '@/components/Copy'
import './home.scss'
import { Status } from '@/constants/ApplicationStatus.enum'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'

const { Title } = Typography

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [id, setId] = useState(0)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [cv, setCv] = useState()
  const [score, setScore] = useState(0)
  const [accept, setAccept] = useState(0)
  const [reject, setReject] = useState(0)
  const [notSeen, setNotSeen] = useState(0)
  const [low, setLow] = useState(0)
  const [medium, setMedium] = useState(0)
  const [high, setHigh] = useState(0)

  const [api, contextHolder] = notification.useNotification()

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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const id = window.sessionStorage.getItem('enterpriseId') || ''
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/${id}`)).json()
      setData(data?.data)
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
    let low = 0
    let medium = 0
    let high = 0
    for (let i = 0; i < data.length; ++i) {
      if (data[i].score < 5) ++low
      else if (5 <= data[i].score && data[i].score < 8) ++medium
      else if (data[i].score >= 8) ++high
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
    setLow(low)
    setMedium(medium)
    setHigh(high)
  }

  const showModal = async (userId: number, id: number, score: number) => {
    setIsModalOpen(true)
    try {
      setScore(score)
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/${userId}`)).json()

      await updateStatus(id, Status.WATCHED)
      setId(id)
      setName(data.data?.fullName)
      setEmail(data.data?.email)
      setPhone(data.data?.phone_number)
      setAvatar(data.data?.avatar)
      setCv(data.data?.cv)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        errorNotification(error.message)
      }
    }
  }

  const handleDownloadCV = () => {
    fetch(`${import.meta.env.VITE_BASE_API_URL}/cv`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleAccept = async (id: number) => {
    await updateStatus(id, Status.SUITABLE)
  }

  const handleDecline = async (id: number) => {
    updateStatus(id, Status.NOT_SUITABLE)
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      const data = await (
        await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/status/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        })
      ).json()
      console.log(data)

      setStatus(data.data?.status)
      calculate(data)
      if (status !== Status.WATCHED) successNotification('Update status success')
      return data
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        errorNotification(error.message)
      }
    }
  }

  const updateScore = async () => {
    try {
      const data = await (
        await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/score/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ score })
        })
      ).json()

      console.log(data)

      successNotification('Success save score')
      fetchData()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        errorNotification(error.message)
      }
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <button onClick={() => handleAccept(id)}>Chấp nhận</button>
    },
    {
      key: '2',
      label: <button onClick={() => handleDecline(id)}>Từ chối</button>
    }
  ]

  return (
    <>
      {contextHolder}
      <ListCard />
      <Modal title='CV' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ width: '2200px' }}>
        <div className='container-pdf'>
          <iframe src={`http://localhost:3000/public/${cv}`} width='100%' height='800px' />
          <div className='flex flex-col p-8 max-w-96 w-full'>
            <div className='flex items-center justify-start w-full gap-5'>
              <Avatar size={64} src={`http://localhost:3000/public/${avatar}`} />
              <div className='flex flex-col'>
                <span>{name}</span>
                <span>{email}</span>
                <span>{phone}</span>
              </div>
            </div>
            <Divider />
            <Title level={3}>Trạng thái CV</Title>
            <Table
              pagination={false}
              rowKey={'status'}
              columns={[
                {
                  title: 'Trạng thái',
                  dataIndex: 'status',
                  key: 'status',
                  render: (item, val) => {
                    if (val.status == Status.WATCHED)
                      return (
                        <Tag icon={<CheckCircleOutlined />} color='default'>
                          Đã xem
                        </Tag>
                      )
                    if (val.status == Status.SUITABLE)
                      return (
                        <Tag icon={<CheckCircleOutlined />} color='success'>
                          Đã Chấp nhận
                        </Tag>
                      )
                    if (val.status == Status.NOT_SUITABLE)
                      return (
                        <Tag icon={<CheckCircleOutlined />} color='red'>
                          Đã từ chối
                        </Tag>
                      )
                  }
                }
              ]}
              dataSource={[
                {
                  status: status
                }
              ]}
            />
            <Flex vertical gap='middle' className='mt-4'>
              <Dropdown menu={{ items }} placement='bottom'>
                <Button>Cập nhật trạng thái CV</Button>
              </Dropdown>
              <Title level={3}>Điểm</Title>
              <Slider min={0} max={10} defaultValue={score} onChange={(e) => setScore(e)} />
              <Button onClick={updateScore}>Lưu điểm</Button>
              <Button onClick={handleDownloadCV}>Tải CV</Button>
            </Flex>
            <Divider />
            <Card title='Thông tin liên hệ' bordered={false}>
              <Flex vertical gap='middle'>
                <Flex justify='space-between' className='bg-[#003eb3] p-2 text-[#fff] rounded-md'>
                  <Flex gap='middle'>
                    <GoogleOutlined />
                    <p>{email}</p>
                  </Flex>
                  <Copy text={email} />
                </Flex>
                <Flex justify='space-between' className='bg-[#ff85c0] p-2 text-[#fff] rounded-md'>
                  <Flex gap='middle'>
                    <PhoneOutlined />
                    <p>{phone}</p>
                  </Flex>
                  <Copy text={phone} />
                </Flex>
              </Flex>
            </Card>
          </div>
        </div>
      </Modal>

      <Flex align='center'>
        <PieChart status={[accept, reject, notSeen]} />
        <BarChart score={[low, medium, high]} />
      </Flex>

      <Table
        dataSource={data}
        pagination={{ pageSize: 9 }}
        rowKey='id'
        columns={[
          {
            dataIndex: 'id',
            title: 'Id',
            align: 'center'
          },
          {
            dataIndex: 'fullName',
            title: 'FullName',
            align: 'center'
          },
          {
            dataIndex: 'email',
            title: 'Email',
            align: 'center'
          },
          {
            dataIndex: 'phone_number',
            title: 'Phone Number',
            align: 'center'
          },
          {
            dataIndex: 'status',
            title: 'Status',
            align: 'center',
            render: (val) =>
              val === 'SUITABLE' || val === 'NOT_SUITABLE' ? (
                <Tag icon={<CheckCircleOutlined />} color='success'>
                  Đã phê duyệt
                </Tag>
              ) : (
                <Tag icon={<SyncOutlined spin />} color='processing'>
                  Đang chờ duyệt
                </Tag>
              )
          },
          {
            dataIndex: 'score',
            title: 'Score',
            align: 'center',
            sorter: (a: { score: number }, b: { score: number }) => a.score - b.score
          },
          {
            dataIndex: 'action',
            title: 'Action',
            align: 'center',
            render: (item, record: { userId: number; id: number; status: string; score: number }) => (
              <Flex gap='small' justify='center'>
                <Button onClick={() => showModal(record.userId, record.id, record.score)}>Xem CV</Button>
                <Button type='primary' onClick={() => handleAccept(record.id)}>
                  Chấp nhận
                </Button>
                <Button type='primary' danger onClick={() => handleDecline(record.id)}>
                  Từ chối
                </Button>
              </Flex>
            )
          }
        ]}
      />
    </>
  )
}

export default Home
