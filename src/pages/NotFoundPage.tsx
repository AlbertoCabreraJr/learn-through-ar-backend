import React from 'react'

import logo from '../assets/logo.png'

const NotFoundPage = () => {
  return (
    <div className='not-found-page-container'>
      <img className='not-found-page-logo' src={logo} alt='Learn through AR logo' />
      <div className='not-found-page-text'>Sorry, that page does not exist!</div>
    </div>
  )
}

export default NotFoundPage
