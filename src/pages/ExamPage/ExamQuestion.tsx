import React, { useEffect, useState } from 'react'
import Choice from '../../types/Choice'
import Question from '../../types/Question'

type ExamQuestionProps = {
  question: Question
  onConfirm: (args: { finalChoice: Choice; correctChoice: Choice; question: Question }) => void
}

const ExamQuestion: React.FC<ExamQuestionProps> = ({ question, onConfirm }) => {
  const [finalChoice, setFinalChoice] = useState<Choice | null>(null)

  useEffect(() => {
    setFinalChoice(null)
  }, [question])

  return (
    <div className='exam-question'>
      <div className='exam-question-text'>{question.text}</div>
      <div className='exam-question-choices'>
        {question.choices.map((choice) => {
          const examQuestionChoiceClassname = `exam-question-choice${
            finalChoice ? (finalChoice._id === choice._id ? '-final' : '') : ''
          }`
          return (
            <div key={choice._id} onClick={() => setFinalChoice(choice)} className={examQuestionChoiceClassname}>
              {choice.text}
            </div>
          )
        })}
      </div>
      <button
        disabled={!finalChoice}
        className='exam-question-confirm'
        onClick={() => {
          if (!finalChoice) {
            return
          }

          onConfirm({ finalChoice, correctChoice: question.correctChoice, question })
        }}
      >
        Confirm
      </button>
    </div>
  )
}

export default ExamQuestion
