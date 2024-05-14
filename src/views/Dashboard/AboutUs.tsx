import { InboxOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, InputRef, UploadFile, UploadProps, message, notification } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useEffect, useRef, useState } from 'react'

const AboutUs = () => {
  const [status, setStatus] = useState<boolean>(true)
  const nameRef = useRef<InputRef | null>(null)
  const emailRef = useRef<InputRef | null>(null)
  const addressRef = useRef<InputRef | null>(null)
  const aboutMeRef = useRef<InputRef | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [file, setFile] = useState<UploadFile | null>(null)

  const [api, contextHolder] = notification.useNotification()

  const props: UploadProps = {
    multiple: false,
    // name: 'file',
    beforeUpload: (file) => {
      return false
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        console.log('File uploaded successfully:', info.file.response)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
        setFile(null)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files[0])
      setFile(e.dataTransfer.files[0])
    },
    accept: 'image/png, image/jpeg'
  }

  useEffect(() => {
    const id = sessionStorage.getItem('enterpriseId')
    fetch(`${import.meta.env.VITE_BASE_API_URL}/enterprise/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setName(data?.data?.name)
        setEmail(data?.data?.email)
        setAddress(data?.data?.address)
        setAboutMe(data?.data?.about_me)
      })
      .catch((error) => console.log(error))
  }, [])

  const changeStatus = () => {
    setStatus(!status)
  }

  const handleEdit = () => {
    changeStatus()
  }

  const handleSave = () => {
    changeStatus()
    const formData = new FormData()
    formData.append('address', address)
    formData.append('about_me', aboutMe)
    formData.append('file', file)

    console.log(formData)

    const id = sessionStorage.getItem('enterpriseId')
    fetch(`${import.meta.env.VITE_BASE_API_URL}/enterprise/${id}`, {
      method: 'put',
      body: formData
    })
      .then((res) => res.json())
      .then(
        (data) => console.log(data)
        // api.success({
        //   message: `Success`,
        //   description: 'Update'
        // })
      )
      .catch((error) => {
        api.error({
          message: `Error`,
          description: error.message
        })
      })
  }

  return (
    <Card>
      {contextHolder}
      <Form layout='vertical'>
        <Form.Item label='Name'>
          <Input disabled={true} ref={nameRef} value={name} />
        </Form.Item>
        <Form.Item label='Email'>
          <Input type='email' disabled={true} ref={emailRef} value={email} />
        </Form.Item>
        <Form.Item label='Address'>
          <Input disabled={status} ref={addressRef} value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
        <Form.Item label='Upload avatar'>
          <Dragger {...props} disabled={status}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
              files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item label='About me'>
          <Input.TextArea
            disabled={status}
            rows={6}
            maxLength={100}
            value={aboutMe}
            ref={aboutMeRef}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </Form.Item>
        {status ? <Button onClick={handleEdit}>Edit</Button> : <Button onClick={handleSave}>Save</Button>}
      </Form>
    </Card>
  )
}

export default AboutUs
