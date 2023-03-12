import React from 'react'

import logo from '../assets/logo.svg'

const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>Sorry, that page does not exist!</div>
    </div>
  )
}

export default NotFoundPage
