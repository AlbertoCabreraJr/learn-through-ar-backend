import React, { useRef, useState } from 'react'
import ProgressBar from '../../../../components/ProgressBar'
import useSound from 'use-sound'
import backIcon from '../../../../assets/chevron-left-ar-instruction.svg'
import nextIcon from '../../../../assets/chevron-right-ar-instruction.svg'

const soundTap = require('../../../../assets/sounds/sound-tap.mp3')

type InsideARInstructionsProps = {
  hasEnterAr: boolean
  instructions: {
    title: string
    details: string
  }[]
  onStart: () => void
  onBack: () => void
  onNext: () => void
  onClose: () => void
  started: boolean
  currentInstructionIndex: number
  progress: number
  close: boolean
}

const InsideARInstructions: React.FC<InsideARInstructionsProps> = ({
  hasEnterAr,
  instructions,
  started,
  onStart,
  onBack,
  onNext,
  onClose,
  currentInstructionIndex,
  progress,
  close
}) => {
  if (!hasEnterAr || close) {
    return null
  }

  const shouldShowBackArrow = (): boolean => {
    if (currentInstructionIndex <= 1) {
      return false
    }

    return true
  }

  const shouldShowNextArrow = (): boolean => {
    if (currentInstructionIndex >= instructions.length - 1) {
      return false
    }

    return true
  }

  const shouldShowCloseButton = (): boolean => {
    // already in last instruction
    if (!shouldShowNextArrow()) {
      return true
    }

    return false
  }

  return (
    <div className='module-2-topic-1-inside-ar-instructions'>
      <div className='content-container'>
        {started && (
          <div className='content-header'>
            <ProgressBar percentage={progress} />
          </div>
        )}
        <div className='content-body'>
          {started ? (
            <>
              <LeftContent showContent={shouldShowBackArrow()} onClick={onBack} />
              <CenterContent
                content={instructions[currentInstructionIndex]}
                showCloseButton={shouldShowCloseButton()}
                onClose={onClose}
              />
              <RightContent showContent={shouldShowNextArrow()} onClick={onNext} />
            </>
          ) : (
            <StartButton onStart={onStart} />
          )}
        </div>
      </div>
    </div>
  )
}

const StartButton = ({ onStart }: { onStart: () => void }) => {
  const [playSound] = useSound(soundTap)

  return (
    <div
      className='start-button'
      onClick={() => {
        playSound()
        onStart()
      }}
    >
      START
    </div>
  )
}

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  const [playSound] = useSound(soundTap)

  return (
    <div
      className='close-button'
      onClick={() => {
        playSound()
        onClose()
      }}
    >
      CLOSE
    </div>
  )
}

const LeftContent = ({ showContent, onClick }: { showContent: boolean; onClick: () => void }) => {
  const [playSound] = useSound(soundTap)

  return (
    <div
      className='left-content'
      onClick={() => {
        playSound()
        onClick()
      }}
    >
      {showContent ? <img className='icon' src={backIcon} alt='Next icon' /> : ''}
    </div>
  )
}

const CenterContent = ({
  content,
  showCloseButton,
  onClose
}: {
  content: {
    title: string
    details: string
  }
  showCloseButton: boolean
  onClose: () => void
}) => {
  const { title, details } = content

  return (
    <div className='center-content'>
      <div className='title'>{title}</div>
      <div className='details'>{details}</div>
      {showCloseButton ? <CloseButton onClose={onClose} /> : null}
    </div>
  )
}

const RightContent = ({ showContent, onClick }: { showContent: boolean; onClick: () => void }) => {
  const [playSound] = useSound(soundTap)

  return (
    <div
      className='right-content'
      onClick={() => {
        playSound()
        onClick()
      }}
    >
      {showContent ? <img className='icon' src={nextIcon} alt='Back icon' /> : ''}
    </div>
  )
}

export default InsideARInstructions
