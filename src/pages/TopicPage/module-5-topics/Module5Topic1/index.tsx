import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-converter'

import React, { useEffect, useRef, useState } from 'react'
import Instructions from './Instructions'
import InsideARInstructions from './InsideARInstructions'
import SuccessMessage from './SuccessMessage'
import useSound from 'use-sound'
import { useNavigate } from 'react-router-dom'
import CustomARButton from './CustomARButton'

//  @ts-ignore
import * as fp from 'fingerpose'
import * as handpose from '@tensorflow-models/handpose'
import CustomCamera from './CustomCamera'
const soundSuccess = require('../../../../assets/sounds/sound-success.mp3')

const { GestureDescription, Finger, FingerCurl, GestureEstimator } = fp

const RockGesture = new GestureDescription('rock')
RockGesture.addCurl(Finger.Index, FingerCurl.FullCurl)
RockGesture.addCurl(Finger.Middle, FingerCurl.FullCurl)
RockGesture.addCurl(Finger.Ring, FingerCurl.FullCurl)
RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl)
RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl)

const PaperGesture = new GestureDescription('paper')
PaperGesture.addCurl(Finger.Index, FingerCurl.NoCurl)
PaperGesture.addCurl(Finger.Middle, FingerCurl.NoCurl)
PaperGesture.addCurl(Finger.Ring, FingerCurl.NoCurl)
PaperGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl)
PaperGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl)

const ScissorsGesture = new GestureDescription('scissors')
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl)
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl)
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl)
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl)
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl)
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl)

const gestures = [RockGesture, PaperGesture, ScissorsGesture]
const gestureEstimator = new GestureEstimator(gestures)
const gesturesStrings = ['rock', 'paper', 'scissors']

const getGestureEmoji = (gesture: string | null) => {
  switch (gesture) {
    case 'paper':
      return '🖐️'
    case 'rock':
      return '✊'
    case 'scissors':
      return '✌️'
    default:
      return ''
  }
}

const generateComputerGesture = (gestures: any) => {
  const randomIndex = Math.floor(Math.random() * gestures.length)
  const gesture = gestures[randomIndex]

  return gesture
}

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const instructions = [
  {
    title: 'START',
    details: ''
  },
  {
    title: 'if/then condition',
    details: `An "if/then" condition is a logical statement that helps a computer or program make decisions based on certain conditions.`
  },
  {
    title: 'if/then condition',
    details:
      'It follows a simple structure: if a specific condition is true, then a particular action or set of actions will be taken. Otherwise, skip the action.'
  },
  {
    title: 'if/then condition',
    details: 'In this activity, we will play the classic game of "rock, paper, scissors".'
  },
  {
    title: 'if/then condition',
    details: `"rock, paper, scissors" is built upon the concept of if/then condition.`
  },
  {
    title: 'if/then condition',
    details: 'IF user1 show a rock and user2 show a scissor, THEN user1 wins. So on and so forth.'
  },
  {
    title: 'if/then condition',
    details: 'For this game, your opponent will be a computer.'
  },
  {
    title: 'if/then condition',
    details: 'You need to score 5 to finished this activity!'
  },
  {
    title: 'if/then condition',
    details: 'You just need to place your hand in front of the camera.'
  },
  {
    title: 'if/then condition',
    details: 'Just show your hand either in a rock or scissor or paper position in front of the camera.'
  },
  {
    title: 'if/then condition',
    details: 'Make sure to properly show your hand.'
  }
]

const Module5Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraLoaded, setCameraLoaded] = useState(false)
  const [handposeModel, setHandposeModel] = useState<handpose.HandPose | null>(null)
  const [currentUserGesture, setCurrentUserGesture] = useState(null)
  const [currentComputerGesture, setCurrentComputerGesture] = useState(null)
  const duration = 5
  const [result, setResult] = useState('')
  const [showHands, setShowHands] = useState(false)
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [remainingTime, setRemainingTime] = useState(userScore === 0 && computerScore === 0 ? 10 : duration)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0)
  const [closeInitialInstructions, setCloseInitialInstructions] = useState(false)
  const progress = (100 / instructions.length) * currentInstructionIndex
  const [startedInstructions, setStartedInstructions] = useState(false)
  const navigate = useNavigate()
  const [playSoundSuccess] = useSound(soundSuccess)
  const [isFinish, setIsFinish] = useState(false)
  const WINNER_SCORE = 1

  const determineWinner = (userGesture: string | null, computerGesture: string | null): string => {
    if (userGesture === computerGesture) {
      return 'draw'
    }

    if (
      (userGesture === 'rock' && computerGesture === 'scissors') ||
      (userGesture === 'paper' && computerGesture === 'rock') ||
      (userGesture === 'scissors' && computerGesture === 'paper')
    ) {
      return 'user'
    }

    return 'computer'
  }

  const updateScore = (winner: string) => {
    if (winner === 'user') {
      setUserScore((prevUserScore) => prevUserScore + 1)
    } else if (winner === 'computer') {
      setComputerScore((prevComputerScore) => prevComputerScore + 1)
    }
  }

  useEffect(() => {
    // Initialize handpose model
    const initialize = async () => {
      const handposeModel = await handpose.load()
      setHandposeModel(handposeModel)
    }

    initialize()
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current || !cameraLoaded || !handposeModel || remainingTime !== 0 || result || currentUserGesture) {
        return
      }

      if (!showHands) {
        setShowHands(true)
      }

      const predictions = await handposeModel.estimateHands(videoRef.current, false)
      if (!predictions.length) {
        setCurrentUserGesture(null)
        return
      }

      const gestureEstimations = gestureEstimator.estimate(predictions[0].landmarks, 9)
      if (!gestureEstimations.gestures.length) {
        setCurrentUserGesture(null)
        return
      }

      const gestureResult = gestureEstimations.gestures.reduce((p: any, c: any) =>
        p.confidence > c.confidence ? p : c
      )

      const newUserGesture = gestureResult.name
      const winner = determineWinner(newUserGesture, currentComputerGesture)

      setCurrentUserGesture(newUserGesture)
      setResult(winner)
      updateScore(winner)
    }, 100)

    return () => clearInterval(interval)
  }, [videoRef.current, cameraLoaded, handposeModel, currentUserGesture, remainingTime])

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && cameraLoaded && handposeModel) {
        setRemainingTime((prevTime) => {
          if (prevTime === 5) {
            const newComputerGesture = generateComputerGesture(gesturesStrings)
            setCurrentComputerGesture(newComputerGesture)
          }

          if (prevTime === 0) {
            return 0
          }

          const newRemainingTime = prevTime - 1

          return newRemainingTime
        })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [videoRef.current, cameraLoaded, handposeModel])

  useEffect(() => {
    if (remainingTime === 0) {
      setTimeout(() => {
        setShowHands(false)
        setRemainingTime(duration)
        setCurrentUserGesture(null)
        setResult('')
      }, 7000)
    }
  }, [remainingTime])

  useEffect(() => {
    if (userScore === WINNER_SCORE) {
      playSoundSuccess()
      setIsFinish(true)
      onFinish()
    }
  }, [userScore])

  return (
    <div className='module-5-topic-1'>
      <Instructions hasEnterAr={hasEnterAr} />
      <CustomARButton
        isFinish={isFinish}
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
        started={startedInstructions}
        close={closeInitialInstructions}
        onStart={() => {
          setStartedInstructions(true)
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
      <SuccessMessage hasEnterAr={hasEnterAr} showContent={isFinish} />
      <CustomCamera
        hasEnterAr={hasEnterAr}
        showContent={closeInitialInstructions}
        videoRef={videoRef}
        onCameraLoaded={() => setCameraLoaded(true)}
      />

      {hasEnterAr && closeInitialInstructions && (
        <div className='information'>
          {showHands ? (
            <div className='hands'>
              <div className='hand user'>
                <div className='title'>User</div>
                <div className='value'> {getGestureEmoji(currentUserGesture)}</div>
              </div>
              <div className='hand computer'>
                <div className='title'>Computer</div>
                <div className='value'>{showHands ? getGestureEmoji(currentComputerGesture) : ''}</div>
              </div>
            </div>
          ) : (
            <div className='timer'>
              <div className='title'>Show hands in...</div>
              <div className='value'>{remainingTime}</div>
            </div>
          )}
          <div className='scores'>
            <div className='title'>SCORES</div>
            <div className='value'>
              <div className='user-score'>
                <div className='title'>You</div>
                <div className='value-score'>{userScore}</div>
              </div>
              <div className='computer-score'>
                <div className='title'>Computer</div>
                <div className='value-score'>{computerScore}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Module5Topic1
