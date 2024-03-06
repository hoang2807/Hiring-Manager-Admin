import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import Layout, { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
// import Home from '@/views/Home'

const DashboardLayout = () => {
  false
  return (
    <Layout className='container'>
      <Header>
        <h1>Dashboard</h1>
      </Header>
      <Layout>
        <Sidebar />
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
