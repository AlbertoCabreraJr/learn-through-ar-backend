import React, { useState } from 'react'

type ResultMessageProps = {
  showContent: boolean
  hasEnterAr: boolean
  onClose: () => void
  userGesture: string | null
  computerGesture: string | null
  winner: string
}

const ResultMessage: React.FC<ResultMessageProps> = ({
  hasEnterAr,
  showContent,
  onClose,
  userGesture,
  computerGesture,
  winner
}) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div className='result-message'>
      <span>
        <span style={{ fontWeight: 'bold' }}>IF</span>{' '}
        <span>
          your hand is {userGesture} and computer's hand is {computerGesture}
        </span>
      </span>
      <span style={{ marginTop: 10 }}>
        <span style={{ fontWeight: 'bold' }}>THEN</span>{' '}
        <span>{winner === 'draw' ? 'it is a DRAW' : winner === 'user' ? 'YOU win' : 'COMPUTER wins'}</span>
      </span>
      <div
        className='close-button'
        onClick={() => {
          onClose()
        }}
      >
        OKAY
      </div>
    </div>
  )
}

export default ResultMessage
