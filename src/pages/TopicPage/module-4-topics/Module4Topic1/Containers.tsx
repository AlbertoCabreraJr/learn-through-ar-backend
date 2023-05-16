import React from 'react'
import check from '../../../../assets/check.svg'

type ContainersProps = {
  showContent: boolean
  hasEnterAr: boolean
  containers: {}
}

type ContainerProps = {
  title: string
  filled: boolean
}

const Containers: React.FC<ContainersProps> = ({ containers, hasEnterAr, showContent }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div className='containers'>
      {Object.values(containers).map((container) => (
        // @ts-ignore
        <Container filled={container.filled} title={container.title} />
      ))}
    </div>
  )
}

const Container: React.FC<ContainerProps> = ({ filled, title }) => {
  return (
    <div className={`container ${filled ? 'finished' : 'in-progress'}`}>
      <div className='title'>{title}</div>
      {filled ? <img src={check} alt='Checkmark' className='check-icon' /> : <div className='value'>--</div>}
    </div>
  )
}

export default Containers
