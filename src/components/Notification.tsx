import { notification } from 'antd'

function Notification() {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (message: string) => {
    api.info({
      message: `Error`,
      description: message
    })
  }

  return <div>{contextHolder}</div>
}

export default Notification
