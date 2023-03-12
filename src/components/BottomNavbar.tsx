import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProfileFilledIcon from '../assets/ProfileFilledIcon'
import ProfileOutlinedIcon from '../assets/ProfileOutlinedIcon'
import HomeOutlinedIcon from '../assets/HomeOutlinedIcon'
import HomeFilledIcon from '../assets/HomeFilledIcon'

const BottomNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.pathname)
  return (
    <div className='bottom-navbar'>
      <div className='home' onClick={() => navigate('/')}>
        {location.pathname === '/' ? <HomeFilledIcon /> : <HomeOutlinedIcon />}
      </div>
      <div className='profile' onClick={() => navigate('/profile')}>
        {location.pathname === '/profile' ? <ProfileFilledIcon /> : <ProfileOutlinedIcon />}
      </div>
    </div>
  )
}

export default BottomNavbar
