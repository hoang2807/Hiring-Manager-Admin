// import { login } from '@/api/auth'
import { LoginSchema, LoginType } from '@/models/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Col, Form, type FormProps, Input, Row } from 'antd'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// import { userStore } from '@/storage/user'

const Login = observer(() => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

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

    // userStore.setInfo({
    //   id: res.data.result.id,
    //   enterpriseId: res.data.result.enterpriseId
    // })
    window.sessionStorage.setItem('userId', res.data.result.id)
    window.sessionStorage.setItem('enterpriseId', res.data.result.enterpriseId)
    navigate('/')
  }

  // const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
  //   console.log('Success:', values)
  // }

  return (
    <Row justify='center' align='middle' className='h-lvh'>
      <Col span={5}>
        <Card>
          <Form layout='vertical' onFinish={onSubmit}>
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <Form.Item label='Email' name='email'>
                  <Input {...field} placeholder='Email' name='email' />
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <Form.Item label='Password' name='password'>
                  <Input.Password {...field} type='password' placeholder='Password' name='password' />
                </Form.Item>
              )}
            />
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
