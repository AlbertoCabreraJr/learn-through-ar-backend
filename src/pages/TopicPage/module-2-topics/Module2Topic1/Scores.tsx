import React from 'react'
import check from '../../../../assets/check.svg'

type ScoresProps = {
  scores: {
    boolean: number
    integer: number
    float: number
    string: number
  }
  hasEnterAr: boolean
  currentDataType: 'boolean' | 'integer' | 'float' | 'string'
  showContent: boolean
}

type ScoreProps = {
  title: string
  score: number
  status: 'finished' | 'in-progress' | 'disabled'
}

type Status = 'finished' | 'in-progress' | 'disabled'

const TITLE = {
  boolean: 'Boolean',
  integer: 'Integer',
  float: 'Float',
  string: 'String'
}

const Scores: React.FC<ScoresProps> = ({ hasEnterAr, currentDataType, scores, showContent }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  const getStatus = (args: {
    dataType: 'boolean' | 'integer' | 'float' | 'string'
    currentDataType: 'boolean' | 'integer' | 'float' | 'string'
  }): Status => {
    const { currentDataType, dataType } = args

    if (scores[dataType] === 0 && currentDataType !== dataType) {
      return 'disabled'
    }

    if (scores[dataType] > 0 && currentDataType !== dataType) {
      return 'finished'
    }

    return 'in-progress'
  }

  return (
    <div className='scores'>
      <Score score={scores.string} status={getStatus({ currentDataType, dataType: 'string' })} title={TITLE.string} />
      <Score
        score={scores.integer}
        status={getStatus({ currentDataType, dataType: 'integer' })}
        title={TITLE.integer}
      />
      <Score score={scores.float} status={getStatus({ currentDataType, dataType: 'float' })} title={TITLE.float} />
      <Score
        score={scores.boolean}
        status={getStatus({ currentDataType, dataType: 'boolean' })}
        title={TITLE.boolean}
      />
    </div>
  )
}

const Score: React.FC<ScoreProps> = ({ title, score, status }) => {
  return (
    <div className={`score ${status}`}>
      <div className='title'>{title}</div>
      <div className='score-value'>{score}</div>
      <ScoreStatusIcon status={status} />
    </div>
  )
}

const ScoreStatusIcon = ({ status }: { status: Status }) => {
  if (status === 'disabled') {
    return null
  }

  if (status === 'finished') {
    return <img src={check} alt='Checkmark' className='check-icon' />
  }

  return (
    <div style={{ fontStyle: 'italic', fontSize: '10px', color: '#003075', textAlign: 'center' }}>In progress...</div>
  )
}

export default Scores
