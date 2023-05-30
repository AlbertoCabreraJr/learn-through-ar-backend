import React, { useState } from 'react'
import check from '../../../../assets/check.svg'

type SuccessBoxSelectMessageProps = {
  showContent: boolean
  hasEnterAr: boolean
  onClose: () => void
}

const SuccessBoxSelectMessage: React.FC<SuccessBoxSelectMessageProps> = ({ hasEnterAr, showContent, onClose }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div className='success-select-message'>
      <img src={check} alt='Checkmark' className='check-icon' />
      <div className='title'>Great!</div>
      <div className='sub-title'>That is correct!</div>
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

export default SuccessBoxSelectMessage
