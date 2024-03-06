import { LoginSchema, LoginType } from '@/models/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'

function Login() {
  const { handleSubmit, control } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log('Working: ', data)
  }

  return (
    <Row justify='center' align='middle' className='container'>
      <Col span={5}>
        <Card>
          <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
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
}

export default Login
