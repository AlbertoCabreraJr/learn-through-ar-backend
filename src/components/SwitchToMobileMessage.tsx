import React from 'react'

import logo from '../assets/logo.svg'

const SwitchToMobileMessage = () => {
  return (
    <div className='switch-to-mobile-message'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>
        Welcome! To fully experience the AR capabilities of our web application, please access this web application
        using your mobile device.
      </div>
    </div>
  )
}

export default SwitchToMobileMessage
