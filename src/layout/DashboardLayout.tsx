import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import Layout, { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

// import Home from '@/views/Home'

const DashboardLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
