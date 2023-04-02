import { useLocation, useNavigate } from 'react-router-dom'
import ProfileFilledIcon from '../assets/ProfileFilledIcon'
import ProfileOutlinedIcon from '../assets/ProfileOutlinedIcon'
import HomeOutlinedIcon from '../assets/HomeOutlinedIcon'
import HomeFilledIcon from '../assets/HomeFilledIcon'
import { useUserContext } from '../context/UserContext'

const BottomNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUserContext()

  return (
    <div className='bottom-navbar'>
      <div className='home' onClick={() => navigate(`/course/${user?.course}`)}>
        {location.pathname.includes('/course') ? <HomeFilledIcon /> : <HomeOutlinedIcon />}
      </div>
      <div className='profile' onClick={() => navigate('/profile')}>
        {location.pathname === '/profile' ? <ProfileFilledIcon /> : <ProfileOutlinedIcon />}
      </div>
    </div>
  )
}

export default BottomNavbar
