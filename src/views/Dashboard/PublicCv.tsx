import ListCard from '@/components/ListCard'
import { GoogleOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Flex, Input, Modal, Space, Table, notification } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import { useEffect, useState } from 'react'
// import { Document, Page, pdfjs } from 'react-pdf'
// import pdf from '../../data/CV.pdf'
import './home.scss'
// import 'react-pdf/dist/esm/Page/TextLayer.css'
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import Copy from '@/components/Copy'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

function PublicCv() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [cv, setCv] = useState()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [api, contextHolder] = notification.useNotification()

  const errorNotification = (message: string) => {
    api.error({
      message: `Error`,
      description: message
    })
  }

  const showModal = async (id: number) => {
    setIsModalOpen(true)
    try {
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}`)).json()
      console.log(data)
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

  const handleSearch = async (skill: string) => {
    try {
      const data = await (
        await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/search`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ skill })
        })
      ).json()

      setData(data?.data)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        errorNotification(error.message)
      }
    }
  }

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages)
  // }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/cv`)).json()
      setData(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

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

            <Flex vertical gap='middle' className='mt-4'>
              <Button>Tải CV</Button>
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
      <Space.Compact size='large'>
        <Input
          addonBefore={<SearchOutlined />}
          placeholder='search'
          className='mb-4'
          onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
          onChange={(e) => handleSearch(e.target?.value)}
        />
      </Space.Compact>

      <Table
        dataSource={data}
        pagination={{ pageSize: 9 }}
        rowKey='id'
        columns={[
          {
            dataIndex: 'fullName',
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
            title: 'Gender',
            // key: 'gender'
            render: (gender) => (gender ? <>Male</> : <>Female</>)
          },
          {
            dataIndex: 'address',
            title: 'Address'
            // key: 'address'
          },
          {
            dataIndex: 'action',
            title: 'Action',
            // key: 'action',
            render: (item, record: { id: number }) => (
              <ButtonGroup>
                <Button
                  onClick={() => {
                    showModal(record.id)
                  }}
                >
                  Xem CV
                </Button>
              </ButtonGroup>
            )
          }
        ]}
      />
    </>
  )
}

export default PublicCv
