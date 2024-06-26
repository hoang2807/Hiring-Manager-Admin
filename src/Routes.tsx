import DashboardLayout from '@/layout/DashboardLayout'
import AboutUs from '@/views/Dashboard/AboutUs'
import Home from '@/views/Dashboard/Home'
import Jobs from '@/views/Dashboard/Jobs'
import PublicCv from '@/views/Dashboard/PublicCv'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
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
            <Route path='/cv' element={<PublicCv />} />
          </Route>
          <Route path='/logout' element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
