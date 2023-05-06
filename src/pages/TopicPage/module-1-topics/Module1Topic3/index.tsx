import React from 'react'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module1Topic3: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  return <div onClick={onFinish}>Module1Topic3</div>
}

export default Module1Topic3
