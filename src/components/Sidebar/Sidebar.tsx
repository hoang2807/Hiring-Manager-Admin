import { HomeOutlined, ReadOutlined, SolutionOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const { Sider } = Layout

const items = [
  { label: <Link to=''>Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: <Link to='jobs'>Jobs</Link>, key: 'jobs', icon: <ReadOutlined /> },
  { label: <Link to='about-us'>About us</Link>, key: 'about us', icon: <SolutionOutlined /> }
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Sider theme='light' collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <Menu items={items} />
    </Sider>
  )
}

export default Sidebar