import { Header as AntdHeader } from 'antd/es/layout/layout'
import { ChildrenProps as Props } from '@/type'

function Header({ children }: Props) {
  return (
    <AntdHeader
      style={{
        backgroundColor: 'white'
      }}
    >
      <div className='brand'>{children}</div>
    </AntdHeader>
  )
}

export default Header
