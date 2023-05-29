import React, { useEffect, useState } from 'react'
import CustomARButton from './CustomARButton'
import Instructions from './Instructions'
import InsideARInstructions from './InsideARInstructions'
import SuccessMessage from './SuccessMessage'
import useSound from 'use-sound'
import { useNavigate } from 'react-router-dom'
import Model from './Model'
import { Canvas } from '@react-three/fiber'
import { Controllers, XR } from '@react-three/xr'
import loadGLTF from '../../../../utils/loadGLTF'
import InsideARHelpIcon from './InsideARHelpIcon'
import InsideARHelpContent from './InsideARHelpContent'

const soundSuccess = require('../../../../assets/sounds/sound-success.mp3')

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module5Topic2: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const instructions = [
    {
      title: 'START',
      details: ''
    },
    {
      title: 'Loops ',
      details:
        'The basic idea behind loops is to set a condition that determines whether the loop should continue or stop. '
    },
    {
      title: 'Loops',
      details: 'As long as the condition is true, the loop will keep executing the instructions.'
    },
    {
      title: 'Loops',
      details:
        'Once the condition becomes false, the loop will terminate, and the program will move on to the next set of instructions.'
    },
    {
      title: 'Loops',
      details: 'In this activity, you will control a train whether it should stop or go.'
    },
    {
      title: 'Loops',
      details: 'The train here is illustrated as a loop.'
    },
    {
      title: 'Loops',
      details: 'The train will continually moving until you set a condition to stop it.'
    },
    {
      title: 'Loops',
      details: 'Also, the train will always be stopped until you set a condition to move it.'
    },
    {
      title: 'Loops',
      details: 'All you need to is to press the buttons GO and STOP.'
    },
    {
      title: 'Loops',
      details:
        'Through this activity, you will come to understand that loops in programming operates the same as a train.'
    },
    {
      title: 'Loops',
      details: 'Like a train, a loop is consistently moving until a condition is met to stop it.'
    },

    {
      title: 'Loops',
      details: 'To accomplish this activity you will just need to press the two commands.'
    }
  ]

  const [commandsStatus, setCommandsStatus] = useState({
    go: false,
    stop: false
  })

  const navigate = useNavigate()
  const [playSound] = useSound(soundSuccess)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(1)
  const [closeInitialInstructions, setCloseInitialInstructions] = useState(false)
  const progress = (100 / instructions.length) * currentInstructionIndex
  const [started, setStarted] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(null)
  const [showInsideARHelp, setShowInsideARHelp] = useState(false)

  const areCommandStatusAllTrue = (commandsStatus: any): boolean => {
    return Object.keys(commandsStatus).every((key) => commandsStatus[key as keyof typeof commandsStatus] === true)
  }

  const handleUpdateCommandsStatus = (command: any) => {
    const newCommandsStatus = { ...commandsStatus, [command]: true }

    if (areCommandStatusAllTrue(newCommandsStatus) && !isFinished) {
      playSound()
      setIsFinished(true)
      onFinish()
    }

    setCommandsStatus(newCommandsStatus)
    setCurrentCommand(command)
  }

  const renderActionButtons = () => {
    if (!hasEnterAr || !closeInitialInstructions) {
      return null
    }

    return (
      <div className='module-5-topic-2-action-buttons'>
        <button
          className='module-5-topic-2-action-button'
          onClick={() => {
            handleUpdateCommandsStatus('go')
          }}
        >
          GO
        </button>
        <button
          className='module-5-topic-2-action-button'
          onClick={() => {
            handleUpdateCommandsStatus('stop')
          }}
        >
          STOP
        </button>
      </div>
    )
  }

  useEffect(() => {
    loadGLTF('https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-5/low_poly_train/scene.gltf')
      .then((gltf) => console.log(gltf))
      .catch((error) => console.error('Error loading GLTF model:', error))
  }, [])

  return (
    <div className='module-5-topic-2'>
      <Instructions hasEnterAr={hasEnterAr} />
      <CustomARButton isFinish={isFinished} hasEnterAr={hasEnterAr} />
      <InsideARInstructions
        progress={progress}
        hasEnterAr={hasEnterAr}
        currentInstructionIndex={currentInstructionIndex}
        instructions={instructions}
        started={started}
        close={closeInitialInstructions}
        onStart={() => {
          setStarted(true)
          setCurrentInstructionIndex(currentInstructionIndex + 1)
        }}
        onBack={() => {
          setCurrentInstructionIndex(currentInstructionIndex - 1)
        }}
        onNext={() => {
          setCurrentInstructionIndex(currentInstructionIndex + 1)
        }}
        onClose={() => {
          setCloseInitialInstructions(true)
        }}
      />
      <InsideARHelpIcon
        hasEnterAr={hasEnterAr}
        setShowContent={setShowInsideARHelp}
        showIcon={closeInitialInstructions}
      />
      <InsideARHelpContent hasEnterAr={hasEnterAr} showContent={showInsideARHelp} />

      <SuccessMessage hasEnterAr={hasEnterAr} showContent={isFinished} />

      {renderActionButtons()}

      <Canvas>
        <XR onSessionStart={() => setHasEnterAr(true)} onSessionEnd={() => setHasEnterAr(false)}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Controllers />
          {hasEnterAr && closeInitialInstructions && <Model animationIndex={currentCommand === 'go' ? 0 : 1} />}
        </XR>
      </Canvas>
    </div>
  )
}

export default Module5Topic2
