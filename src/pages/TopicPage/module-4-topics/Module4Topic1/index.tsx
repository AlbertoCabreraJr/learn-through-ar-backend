import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import React, { useState } from 'react'
import CustomARButton from './CustomARButton'
import Instructions from './Instructions'
import InsideARInstructions from './InsideARInstructions'
import SuccessMessage from './SuccessMessage'
import useSound from 'use-sound'
import Containers from './Containers'
import CustomCamera from './CustomCamera'
import cameraIcon from '../../../../assets/camera.svg'
import * as mobilenet from '@tensorflow-models/mobilenet'
import Loader from '../../../../components/Loader'
import ErrorMessage from './ErrorMessage'
import { useNavigate } from 'react-router-dom'

const soundSuccess = require('../../../../assets/sounds/sound-success.mp3')

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module4Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const instructions = [
    {
      title: 'START',
      details: ''
    },
    {
      title: 'Variables',
      details:
        'A variable is simply a CONTAINER or BOX that can hold different things such as numbers, strings, and other type of data.'
    },
    {
      title: 'Variables',
      details: 'A variable has a NAME and a VALUE.'
    },
    {
      title: 'Variables',
      details: 'A variable named book, and the value of that variable, guess what, also a book.'
    },
    {
      title: 'Variables',
      details: "We should name a variable base on what it is holding or what it's value."
    },
    {
      title: 'Variables',
      details: 'In this exercise, you will be presented by 4 CONTAINERS.'
    },
    {
      title: 'Variables',
      details: "Each container have it's corresponding names."
    },
    {
      title: 'Variables',
      details: 'But these containers are currently empty.'
    },
    {
      title: 'Variables',
      details: 'What you will do is fill these containers.'
    },
    {
      title: 'Variables',
      details:
        'To fill these containers, you will take a picture/photo of an object base on the names of the containers.'
    },
    {
      title: 'Variables',
      details: 'When capturing the picture, ensure sufficient lighting to achieve brightness and clarity.'
    },
    {
      title: 'Variables',
      details: `When it doesn't the object, try also capturing it in landscape mode.`
    },
    {
      title: 'Variables',
      details:
        'Example, a container named banana. You will take a picture of a banana so that the container will be filled by a banana.'
    }
  ]

  const [containers, setContainers] = useState({
    pen: {
      title: 'Pen',
      filled: false
    },
    keyboard: {
      title: 'Keyboard',
      filled: false
    },
    screen: {
      title: 'Computer Screen',
      filled: false
    }
  })
  const navigate = useNavigate()
  const [playSound] = useSound(soundSuccess)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0)
  const [closeInitialInstructions, setCloseInitialInstructions] = useState(false)
  const progress = (100 / instructions.length) * currentInstructionIndex
  const [started, setStarted] = useState(false)
  const [image, setImage] = useState()
  const [takeScreenshot, setTakeScreenshot] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleUpdateContainer = (args: { containerKey: string; filled: boolean }) => {
    const { containerKey, filled } = args

    // @ts-ignore
    setContainers({ ...containers, [containerKey]: { title: containers[containerKey].title, filled } })
  }

  const handleImageClassification = async (imageUrl: string) => {
    setLoading(true)

    let img = document.createElement('img')
    img.src = imageUrl
    img.width = 100
    img.height = 100

    const model = await mobilenet.load()
    const predictions = await model.classify(img)

    setLoading(false)

    const classnames = predictions.map((prediction) => prediction.className)

    interface MatchResult {
      hasMatch: boolean
      matchedKey?: string
    }

    const matchResult: MatchResult = {
      hasMatch: false
    }

    Object.keys(containers).some((key) => {
      const hasMatch = predictions.some((prediction) => prediction.className.toLowerCase().includes(key))
      if (hasMatch) {
        matchResult.hasMatch = true
        matchResult.matchedKey = key
        return true // exit the loop early
      }
      return false
    })

    if (matchResult.hasMatch) {
      playSound()
      handleUpdateContainer({ containerKey: matchResult.matchedKey!, filled: true })
    } else {
      setShowError(true)
    }
  }

  const isFinished = (): boolean => {
    //@ts-ignore
    const finish = Object.keys(containers).every((key) => containers[key].filled === true)

    if (finish) {
      onFinish()
    }

    return finish
  }

  return (
    <div className='module-4-topic-1'>
      {loading && (
        <div className='overlay'>
          <Loader />
        </div>
      )}
      <CustomCamera
        hasEnterAR={hasEnterAr}
        onScreenshot={(imageUrl) => {
          handleImageClassification(imageUrl)

          setTakeScreenshot(false)
        }}
        startScreenshot={takeScreenshot}
      />
      <Instructions hasEnterAr={hasEnterAr} />
      <CustomARButton
        isFinish={isFinished()}
        hasEnterAr={hasEnterAr}
        onStart={() => {
          setHasEnterAr(true)
        }}
        onExit={() => {
          navigate(-1)
        }}
      />
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

      <SuccessMessage hasEnterAr={hasEnterAr} showContent={isFinished()} />
      <ErrorMessage
        hasEnterAr={hasEnterAr}
        showContent={showError}
        onClose={() => {
          setShowError(false)
        }}
      />

      <Containers containers={containers} hasEnterAr={hasEnterAr} showContent={closeInitialInstructions} />

      {hasEnterAr && closeInitialInstructions && !isFinished() && (
        <div className='camera-button-container' onClick={() => setTakeScreenshot(true)}>
          <div className='content'>
            <img src={cameraIcon} alt='camera button' width={30} height={30} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Module4Topic1
