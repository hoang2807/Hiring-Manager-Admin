import { Button, Table, Tag, Modal, Avatar, Divider, Flex, Card } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import ListCard from '@/components/ListCard'
import { CheckCircleOutlined, GoogleOutlined, PhoneOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons'
import { Document, Page, pdfjs } from 'react-pdf'
import pdf from '../../data/CV.pdf'
import './home.scss'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  useEffect(() => {
    const id = window.sessionStorage.getItem('enterpriseId')
    fetch(`http://localhost:3000/api/job/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }, [])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  return (
    <>
      <ListCard />
      <Modal title='CV' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ width: '2200px' }}>
        <div className='container-pdf'>
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div className='flex flex-col p-8 max-w-96 w-full'>
            <div className='flex items-center justify-start w-full gap-5'>
              <Avatar size='large' icon={<UserOutlined />} />
              <div className='flex flex-col'>
                <span>Họ tên</span>
                <span>email</span>
                <span>sdt</span>
              </div>
            </div>
            <Divider />
            <span>Trạng thái CV</span>
            <Table
              pagination={false}
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
              <Button>Cập nhật trạng thái CV</Button>
              <Button>Tải CV</Button>
            </Flex>
            <Divider />
            <Card title='Thông tin liên hệ' bordered={false}>
              <Flex vertical gap='middle'>
                <Flex gap='middle' className='bg-[#003eb3] p-2 text-[#fff] rounded-md'>
                  <GoogleOutlined />
                  <p>gmail</p>
                </Flex>
                <Flex gap='middle' className='bg-[#ff85c0] p-2 text-[#fff] rounded-md'>
                  <PhoneOutlined />
                  <p>123456</p>
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
          },
          {
            dataIndex: 'action',
            title: 'Action',
            // key: 'action',
            render: () => (
              <ButtonGroup>
                <Button onClick={showModal}>Xem CV</Button>
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
