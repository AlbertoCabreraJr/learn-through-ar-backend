import React from 'react'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module2Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  return <div onClick={onFinish}>Module2Topic1</div>
}

export default Module2Topic1
