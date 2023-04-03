import React from 'react'
import logo from '../../assets/logo.svg'
import close from '../../assets/close.svg'

type ScoreProps = {
  score: number
  totalScore: number
  onClose: () => void
  examTitle: string
}

const Score: React.FC<ScoreProps> = ({ score, onClose, totalScore, examTitle }) => {
  return (
    <div className='exam-score'>
      <div className='close-button' onClick={onClose}>
        <img className='icon' src={close} alt='Close icon' />
      </div>
      <div className='contents'>
        <img className='logo' src={logo} alt='Learn through AR logo' />
        <div className='score-text'>Score</div>

        <div className='final-and-total-scores'>
          <div className='final-score'>{score}</div>
          <div className='out-of'>out of</div>
          <div className='total-score'>{totalScore}</div>
        </div>
        <div className='for'>for</div>
        <div className='title'>{examTitle}</div>
      </div>
    </div>
  )
}

export default Score
