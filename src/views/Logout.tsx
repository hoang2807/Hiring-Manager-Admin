import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()
  useEffect(() => {
    window.sessionStorage.clear()
    navigate('/login', { replace: true })
  }, [])
  return <div>Logout</div>
}

export default Logout
