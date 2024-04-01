import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import Layout, { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
// import Home from '@/views/Home'

const DashboardLayout = () => {
  return (
    <Layout className='container'>
      <Sidebar />
      <Layout>
        <Header>
          <h1>Dashboard</h1>
        </Header>
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
