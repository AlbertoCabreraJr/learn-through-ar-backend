import React from 'react'

type ScoreProps = {
  showContent: boolean
  hasEnterAr: boolean
  userScore: number
  computerScore: number
}

const Scores: React.FC<ScoreProps> = ({ hasEnterAr, showContent, computerScore, userScore }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div className='scores'>
      <div className='user-score'>
        <div className='title'>You</div>
        <div className='value'>{userScore}</div>
      </div>
      <div className='computer-score'>
        <div className='title'>Computer</div>
        <div className='value'>{computerScore}</div>
      </div>
    </div>
  )
}

export default Scores
