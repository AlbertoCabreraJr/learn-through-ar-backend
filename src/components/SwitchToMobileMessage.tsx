import React from 'react'

import logo from '../assets/logo.svg'

const SwitchToMobileMessage = () => {
  return (
    <div className='switch-to-mobile-message'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>
        For the best experience, please switch to our mobile version to fully utilize the AR capabilities of our web application. Thank you!
      </div>
    </div>
  )
}

export default SwitchToMobileMessage
