import React from 'react'
import logo from '../../assets/logo.svg'
import close from '../../assets/close.svg'

type ScoreProps = {
  onClose: () => void
}

const ExamTakenMessage: React.FC<ScoreProps> = ({ onClose }) => {
  return (
    <div className='exam-taken-message'>
      <div className='close-button' onClick={onClose}>
        <img className='icon' src={close} alt='Close icon' />
      </div>
      <div className='contents'>
        <img className='logo' src={logo} alt='Learn through AR logo' />
        <div className='title'>You have already taken this exam. Your score won't be saved if you retake it.</div>
      </div>
    </div>
  )
}

export default ExamTakenMessage
