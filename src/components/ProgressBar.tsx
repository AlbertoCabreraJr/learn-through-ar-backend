import React from 'react'

type ProgressBarProps = {
  percentage: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className='progress-bar'>
      <div className='progress-bar-inner' style={{ width: `${percentage}%` }} />
    </div>
  )
}

export default ProgressBar
