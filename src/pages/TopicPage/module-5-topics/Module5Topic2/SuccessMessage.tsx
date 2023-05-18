import React, { useState } from 'react'

type SuccessMessageProps = {
  showContent: boolean
  hasEnterAr: boolean
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ hasEnterAr, showContent }) => {
  const [close, setClose] = useState(false)

  if (!hasEnterAr || !showContent || close) {
    return null
  }

  return (
    <div className='success-message'>
      <div className='title'>Congratulations!</div>
      <div className='sub-title'>You have finished the activity.</div>
      <div className='close-button' onClick={() => setClose(true)}>
        CLOSE
      </div>
    </div>
  )
}

export default SuccessMessage
