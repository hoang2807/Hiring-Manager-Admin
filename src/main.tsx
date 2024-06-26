import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2123bf'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
