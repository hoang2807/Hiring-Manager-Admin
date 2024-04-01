import DashboardLayout from '@/layout/DashboardLayout'
import AboutUs from '@/views/Dashboard/AboutUs'
import Home from '@/views/Dashboard/Home'
import Jobs from '@/views/Dashboard/Jobs'
import Login from '@/views/Login'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

const PrivateRoutes = () => {
  const id = window.sessionStorage.getItem('enterpriseId')

  return id ? <Outlet /> : <Navigate to='/login' replace />
}

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateRoutes />}>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/jobs' element={<Jobs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
