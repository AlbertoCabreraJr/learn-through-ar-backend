import React, { useState } from 'react'
import wrong from '../../../../assets/wrong.svg'

type ErrorMessageProps = {
  showContent: boolean
  hasEnterAr: boolean
  onClose: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ hasEnterAr, showContent, onClose }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div className='error-message'>
      <img src={wrong} alt='Checkmark' className='check-icon' />
      <div className='title'>Oops!</div>
      <div className='sub-title'>Selected box is incorrect.</div>
      <div
        className='close-button'
        onClick={() => {
          onClose()
        }}
      >
        CLOSE
      </div>
    </div>
  )
}

export default ErrorMessage
