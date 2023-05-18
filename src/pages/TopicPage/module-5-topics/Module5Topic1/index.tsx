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
import Scores from './Scores'
import Timer from './Timer'

//  @ts-ignore
import * as fp from 'fingerpose'
import * as handpose from '@tensorflow-models/handpose'
import CustomCamera from './CustomCamera'
import ComputerHand from './ComputerHand'

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

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module5Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
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

  const navigate = useNavigate()
  const [playSoundSuccess] = useSound(soundSuccess)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0)
  const [closeInitialInstructions, setCloseInitialInstructions] = useState(false)
  const progress = (100 / instructions.length) * currentInstructionIndex

  const [startedInstructions, setStartedInstructions] = useState(false)
  const WINNER_SCORE = 5
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [userGesture, setUserGesture] = useState<any>(null)
  const [computerGesture, setComputerGesture] = useState<any>(null)
  const [showComputerGesture, setShowComputerGesture] = useState(false)
  const [gestureEstimator, setGestureEstimator] = useState<any>()
  const [handposeModel, setHandposeModel] = useState<any>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldPredict, setShouldPredict] = useState(false)
  const [startTimer, setStartTimer] = useState(false)
  const [isFinish, setIsFinish] = useState(false)

  const gestures = ['rock', 'paper', 'scissors']

  const handleStop = async () => {
    setShouldPredict(false)
    setShowComputerGesture(true)

    determineWinner(userGesture, computerGesture)

    handleReset()
  }

  const generateComputerGesture = () => {
    const randomIndex = Math.floor(Math.random() * gestures.length)
    const gesture = gestures[randomIndex]
    setComputerGesture(gesture)
  }

  const handleReset = () => {
    setUserGesture(null)
    setShowComputerGesture(false)
    setShouldPredict(true)
    setStartTimer(true)
    generateComputerGesture()
  }

  const predictGesture = async (sourceElement: any, minimumScore: any) => {
    if (!handposeModel || !gestureEstimator || !shouldPredict) return

    const predictions = await handposeModel.estimateHands(sourceElement, false)

    if (predictions.length > 0) {
      const gestureEstimations = gestureEstimator.estimate(predictions[0].landmarks, minimumScore)

      if (gestureEstimations.gestures.length > 0) {
        const gestureResult = gestureEstimations.gestures.reduce((p: any, c: any) => {
          return p.confidence > c.confidence ? p : c
        })
        console.log(gestureResult.name)
        setUserGesture(gestureResult.name)
      }
    } else {
      setUserGesture('')
    }
  }

  const updateGesturePrediction = () => {
    if (videoRef.current && shouldPredict) {
      predictGesture(videoRef.current, 9) // Adjust the minimumScore value as needed
    }

    requestAnimationFrame(updateGesturePrediction)
  }

  const determineWinner = (userGesture: string, computerGesture: string) => {
    if (!gestures.includes(userGesture) || !gestures.includes(computerGesture)) {
      setComputerScore(computerScore + 1)
      return
    }

    if (userGesture === computerGesture) {
      return
    }

    if (
      (userGesture === 'rock' && computerGesture === 'scissors') ||
      (userGesture === 'paper' && computerGesture === 'rock') ||
      (userGesture === 'scissors' && computerGesture === 'paper')
    ) {
      const newScore = userScore + 1
      if (newScore === WINNER_SCORE) {
        setIsFinish(true)
      }
      setUserScore(userScore + 1)
      return
    }

    setComputerScore(computerScore + 1)
  }

  useEffect(() => {
    const initialize = async () => {
      // initialize finger gesture recognizer with known gestures
      const gestures = [RockGesture, PaperGesture, ScissorsGesture]
      const gestureEstimator = new GestureEstimator(gestures)
      setGestureEstimator(gestureEstimator)

      const handposeModel = await handpose.load()
      setHandposeModel(handposeModel)
    }

    initialize()
  }, [])

  useEffect(() => {
    if (isFinish) {
      playSoundSuccess()
      onFinish()
    }
  }, [isFinish])

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
          setStartTimer(true)
          generateComputerGesture()
          setShouldPredict(true)
        }}
      />

      <SuccessMessage hasEnterAr={hasEnterAr} showContent={isFinish} />

      <Scores
        computerScore={computerScore}
        userScore={userScore}
        hasEnterAr={hasEnterAr}
        showContent={closeInitialInstructions && !isFinish}
      />
      <Timer
        hasEnterAr={hasEnterAr}
        showContent={closeInitialInstructions && !isFinish}
        duration={3}
        start={startTimer}
        onStop={handleStop}
      />

      <CustomCamera
        gestureEstimator={gestureEstimator}
        handposeModel={handposeModel}
        updateGesturePrediction={updateGesturePrediction}
        videoRef={videoRef}
        hasEnterAr={hasEnterAr}
        showContent={closeInitialInstructions && !isFinish}
        setShouldStartTimer={setStartTimer}
      />

      <ComputerHand computerGesture={computerGesture} hasEnterAr={hasEnterAr} showContent={startTimer && !isFinish} />
    </div>
  )
}

export default Module5Topic1
