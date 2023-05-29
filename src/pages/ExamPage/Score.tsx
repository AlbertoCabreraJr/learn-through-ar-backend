import React from 'react'
import logo from '../../assets/logo.svg'
import close from '../../assets/close.svg'
import check from '../../assets/check.svg'
import wrong from '../../assets/wrong.svg'

type ScoreProps = {
  score: number
  totalScore: number
  onClose: () => void
  examTitle: string
  results: any[]
}

const message = {
  1: 'Nice try!',
  2: 'Good start!',
  3: 'Well done!',
  4: 'Impressive!',
  5: 'Amazing!'
}

const Score: React.FC<ScoreProps> = ({ score, onClose, totalScore, results }) => {
  return (
    <div className='exam-score'>
      <div className='close-button' onClick={onClose}>
        <img className='icon' src={close} alt='Close icon' />
      </div>
      <div className='contents'>
        {/* @ts-ignore */}
        <div className='message'>{message[score]}</div>
        <div className='final-total-scores'>
          {score} / {totalScore}
        </div>
        <div className='score-text'>Score</div>
      </div>
      <div className='results'>
        <div className='headers'>
          <div className='headers-text'>Question</div>
          <div className='headers-text'>Choice</div>
          <div className='headers-text result-text'>Result</div>
        </div>

        <div className='line' />
        <div className='details'>
          {results.map((result, index) => {
            return (
              <div className='detail' key={index}>
                <div className='title'>{result.question.text}</div>
                <div className='choice'>{result.finalChoice.text}</div>
                {result.isCorrect ? (
                  <img className='icon-result' src={check} alt='Close icon' />
                ) : (
                  <img className='icon-result' src={wrong} alt='Close icon' />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Score
