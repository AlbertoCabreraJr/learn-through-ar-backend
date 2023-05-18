import React from 'react'

type ComputerHandProps = {
  showContent: boolean
  hasEnterAr: boolean
  computerGesture: string
}

const ComputerHand: React.FC<ComputerHandProps> = ({ hasEnterAr, showContent, computerGesture }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return <div>{computerGesture}</div>
}

export default ComputerHand
