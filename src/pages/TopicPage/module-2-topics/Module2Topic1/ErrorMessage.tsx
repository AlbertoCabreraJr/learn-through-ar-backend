import React, { useState } from 'react'

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
      <div className='title'>Oops!</div>
      <div className='sub-title'>You are incorrect.</div>
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
