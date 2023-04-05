import React from 'react'
import logo from '../../assets/logo.svg'

type ScoreProps = {
  onClickNo: () => void
  onClickYes: () => void
}

const ExamExitMessage: React.FC<ScoreProps> = ({ onClickNo, onClickYes }) => {
  return (
    <div className='exam-exit-message'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='title'>Are you sure you want to quit?</div>
      <div className='subtitle'>Exam answers won't be save.</div>
      <div className='buttons'>
        <button className='no' onClick={onClickNo}>
          NO
        </button>
        <button className='yes' onClick={onClickYes}>
          YES
        </button>
      </div>
    </div>
  )
}

export default ExamExitMessage
