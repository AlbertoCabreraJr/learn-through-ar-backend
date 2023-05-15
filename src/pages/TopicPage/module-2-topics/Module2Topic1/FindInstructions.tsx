import React from 'react'
import useSound from 'use-sound'
const soundTap = require('../../../../assets/sounds/sound-tap.mp3')

type FindInstructionsProps = {
  showContent: boolean
  hasEnterAr: boolean
  content: React.ReactElement
  onClick: () => void
}

// We will show these instructions if the first set of instruction was closed.
const FindInstructions: React.FC<FindInstructionsProps> = ({ showContent, hasEnterAr, content, onClick }) => {
  const [playSound] = useSound(soundTap)

  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div className='module-2-topic-1-find-instructions'>
      <div className='content-container'>
        <div className='details'>{content}</div>
        <div
          className='okay-button'
          onClick={() => {
            playSound()
            onClick()
          }}
        >
          OKAY
        </div>
      </div>
    </div>
  )
}

export default FindInstructions
