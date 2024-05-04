// import { login } from '@/api/auth'
import { LoginType } from '@/models/User'
import { Button, Card, Col, Form, Input, Row, notification } from 'antd'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
// import { userStore } from '@/storage/user'

const Login = observer(() => {
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (message: string) => {
    api.info({
      message: `Error`,
      description: message
    })
  }
  // const { handleSubmit, control } = useForm<LoginType>({
  //   resolver: zodResolver(LoginSchema),
  //   defaultValues: {
  //     email: '',
  //     password: ''
  //   }
  // })

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const res = await (
      await fetch(`http://localhost:3000/api/auth-admin/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email, password: data.password })
      })
    ).json()
    if (res.statusCode == HttpStatusCode.Unauthorized) return openNotification('Username or password invalid')

    if (res.statusCode === HttpStatusCode.InternalServerError) return openNotification('Internal Server Error ')

    // userStore.setInfo({
    //   id: res.data.result.id,
    //   enterpriseId: res.data.result.enterpriseId
    // })
    if (res.statusCode === HttpStatusCode.Ok || res.statusCode === HttpStatusCode.Created) {
      window.sessionStorage.setItem('userId', res.data.result.id)
      window.sessionStorage.setItem('enterpriseId', res.data.result.enterpriseId)
      navigate('/')
    }
  }

  // const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
  //   console.log('Success:', values)
  // }

  return (
    <Row justify='center' align='middle' className='h-lvh'>
      {contextHolder}
      <Col span={5}>
        <Card>
          <Form layout='vertical' onFinish={onSubmit}>
            <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder='Email' name='email' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password type='password' placeholder='Password' name='password' />
            </Form.Item>
            <Form.Item>
              <Button block type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
})
export default Login
