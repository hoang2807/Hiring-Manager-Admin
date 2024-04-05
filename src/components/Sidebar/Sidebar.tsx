import { HomeOutlined, ReadOutlined, SolutionOutlined, LogoutOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const { Sider } = Layout

const items = [
  { label: <Link to=''>Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: <Link to='jobs'>Jobs</Link>, key: 'jobs', icon: <ReadOutlined /> },
  { label: <Link to='about-us'>About us</Link>, key: 'about us', icon: <SolutionOutlined /> },
  { label: <Link to='logout'>About us</Link>, key: 'logout', icon: <LogoutOutlined /> }
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Sider theme='light' collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <h1 style={{ textAlign: 'center', marginTop: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
      <Menu items={items} />
    </Sider>
  )
}

export default Sidebar
