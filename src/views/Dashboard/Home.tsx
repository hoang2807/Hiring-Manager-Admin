import { Button, Table, Tag, Modal, Avatar, Divider, Flex, Card, Dropdown, MenuProps, notification } from 'antd'
import { useEffect, useState } from 'react'
import ListCard from '@/components/ListCard'
import { CheckCircleOutlined, GoogleOutlined, PhoneOutlined, SyncOutlined } from '@ant-design/icons'
import Copy from '@/components/Copy'
// import { Document, Page, pdfjs } from 'react-pdf'
// import pdf from '../../data/CV.pdf'
import './home.scss'
import { Status } from '@/constants/ApplicationStatus.enum'
// import 'react-pdf/dist/esm/Page/TextLayer.css'
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

// const generateData = () => {
//   const data = []

//   for (let i = 0; i < 32; ++i) {
//     data.push({
//       id: faker.string.uuid(),
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       phone_number: faker.phone.number(),
//       gender: faker.person.sex(),
//       address: faker.location.streetAddress(),
//       status: Math.random() > 0.5 ? true : false
//     })
//   }

//   return data
// }

// const data = generateData()

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
    const id = window.sessionStorage.getItem('enterpriseId') || ''
    fetchData(id)
  }, [])

  const fetchData = async (id: string) => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/${id}`)).json()
      setData(data?.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        errorNotification(error.message)
      }
    }
  }

  const showModal = async (userId: number, id: number) => {
    setIsModalOpen(true)
    try {
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
      console.log(id)
      const data = await (
        await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        })
      ).json()

      setStatus(data.data?.status)
      if (status !== Status.WATCHED) successNotification('Update status success')
      return data
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

  // const [numPages, setNumPages] = useState<number>()
  // const [pageNumber, setPageNumber] = useState<number>(1)

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages)
  // }

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
            <span>Trạng thái CV</span>
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
      <Table
        dataSource={data}
        pagination={{ pageSize: 9 }}
        rowKey='id'
        columns={[
          {
            dataIndex: 'id',
            title: 'Id'
          },
          {
            dataIndex: 'fullName',
            title: 'FullName'
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
            dataIndex: 'status',
            title: 'Status',
            // key: 'status',
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
            dataIndex: 'action',
            title: 'Action',
            // key: 'action',
            render: (item, record: { userId: number; id: number; status: string }) => (
              <Flex gap='small'>
                <Button onClick={() => showModal(record.userId, record.id)}>Xem CV</Button>
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
