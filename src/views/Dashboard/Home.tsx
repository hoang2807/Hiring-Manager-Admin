import { Button, Table, Tag, Modal, Avatar, Divider, Flex, Card, Dropdown, MenuProps } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import { useEffect, useState } from 'react'
import ListCard from '@/components/ListCard'
import { CheckCircleOutlined, GoogleOutlined, PhoneOutlined, SyncOutlined } from '@ant-design/icons'
// import { Document, Page, pdfjs } from 'react-pdf'
// import pdf from '../../data/CV.pdf'
import './home.scss'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

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

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        Chấp nhận
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
        Từ chối
      </a>
    )
  }
]

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [cv, setCv] = useState()

  useEffect(() => {
    const id = window.sessionStorage.getItem('enterpriseId') || ''
    fetchData(id)
  }, [])

  const fetchData = async (id: string) => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/application/${id}`)).json()
      setData(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const showModal = async (id: string) => {
    setIsModalOpen(true)
    try {
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}`)).json()
      setName(data.data?.fullName)
      setEmail(data.data?.email)
      setPhone(data.data?.phone_number)
      setAvatar(data.data?.avatar)
      setCv(data.data?.cv)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // const [numPages, setNumPages] = useState<number>()
  // const [pageNumber, setPageNumber] = useState<number>(1)

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages)
  // }

  return (
    <>
      <ListCard />
      <Modal title='CV' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ width: '2200px' }}>
        <div className='container-pdf'>
          <iframe src={`http://localhost:3000/public/${cv}`} width='100%' height='800px' />
          <div className='flex flex-col p-8 max-w-96 w-full'>
            <div className='flex items-center justify-start w-full gap-5'>
              <Avatar size='large' src={`http://localhost:3000/public/${avatar}`} />
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
                  render: (val) =>
                    val ? (
                      <Tag icon={<CheckCircleOutlined />} color='success'>
                        Đã phê duyệt
                      </Tag>
                    ) : (
                      <Tag icon={<SyncOutlined spin />} color='processing'>
                        Đang chờ duyệt
                      </Tag>
                    )
                }
              ]}
              dataSource={[
                {
                  status: true
                }
              ]}
            />
            <Flex vertical gap='middle' className='mt-4'>
              <Dropdown menu={{ items }} placement='bottom'>
                <Button>Cập nhật trạng thái CV</Button>
              </Dropdown>

              <Button>Tải CV</Button>
            </Flex>
            <Divider />
            <Card title='Thông tin liên hệ' bordered={false}>
              <Flex vertical gap='middle'>
                <Flex gap='middle' className='bg-[#003eb3] p-2 text-[#fff] rounded-md'>
                  <GoogleOutlined />
                  <p>{email}</p>
                </Flex>
                <Flex gap='middle' className='bg-[#ff85c0] p-2 text-[#fff] rounded-md'>
                  <PhoneOutlined />
                  <p>{phone}</p>
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
            render: (item, record) => (
              <ButtonGroup>
                <Button onClick={() => showModal(record.userId)}>Xem CV</Button>
                <Button type='primary'>Chấp nhận</Button>
                <Button type='primary' danger>
                  Từ chối
                </Button>
              </ButtonGroup>
            )
          }
        ]}
      />
    </>
  )
}

export default Home
