import { Box, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Controllers, ARButton, XR, toggleSession } from '@react-three/xr'
import React, { Suspense, useEffect, useReducer, useRef, useState } from 'react'
import { AnimationMixer, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

export const loadGLTF = (path: string) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(path, (gltf) => {
      resolve(gltf)
    })
  })
}

const Model = ({ animationIndex }: { animationIndex: number }) => {
  const [gltf, setGltf] = useState<any>(null)
  const [mixer, setMixer] = useState<any>(null)
  const modelRef = useRef()
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, -5))

  useEffect(() => {
    loadGLTF('https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/banana/scene.gltf')
      .then((gltf) => setGltf(gltf))
      .catch((error) => console.error('Error loading GLTF model:', error))
  }, [])

  // @ts-ignore
  useEffect(() => {
    if (gltf && animationIndex >= 0) {
      // @ts-ignore
      const mixer = new AnimationMixer(modelRef.current)
      const action = mixer.clipAction(gltf.animations.find((clip: any, index: number) => animationIndex === index))
      action.play()

      setMixer(mixer)

      return () => mixer.stopAllAction()
    }
  }, [animationIndex, gltf])

  useFrame((_, delta) => {
    // @ts-ignore
    if (mixer) {
      // @ts-ignore
      mixer.update(delta)
    }
  })

  useEffect(() => {
    if (modelRef.current) {
      const { camera } = useThree()
      const distance = 10
      const vector = new Vector3()
      // @ts-ignore
      vector.setFromMatrixPosition(modelRef.current.matrixWorld)
      const position = vector.applyMatrix4(camera.matrixWorldInverse)
      position.z = -distance

      setPosition(position)
    }
  }, [])

  // @ts-ignore
  return gltf ? <primitive ref={modelRef} object={gltf.scene} scale={[1.5, 1.5, 1.5]} position={position} /> : null
}

const Module1Topic1: React.FC<Props> = ({ onFinish, hasEnterAr, setHasEnterAr }) => {
  const [animationIndex, setAnimationIndex] = useState(0)
  const [areActionButtonsClick, setAreActionButtonsClick] = useState({
    button1: false,
    button2: false,
    button3: false
  })
  const areAllActionButtonsClicked = Object.values(areActionButtonsClick).every((value) => value === true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const moveBanana = (action: number) => {
    switch (action) {
      case 0:
        setAnimationIndex(0)
        break
      case 1:
        setAnimationIndex(1)
        break
      case 2:
        setAnimationIndex(2)
        break

      default:
        break
    }
  }

  useEffect(() => {
    const areAllActionButtonsClicked = Object.values(areActionButtonsClick).every((value) => value === true)

    if (areAllActionButtonsClicked) {
      setShowSuccessMessage(true)
      onFinish()
    }
  }, [areActionButtonsClick.button1, areActionButtonsClick.button2, areActionButtonsClick.button3])

  const renderInstructions = () => {
    if (hasEnterAr) {
      return null
    }

    return (
      <div className='module-1-topic-1'>
        <div className='module-1-topic-1-title'>Objective</div>
        <div className='module-1-topic-1-subtitle'>
          Welcome! Before entering the AR environment, read these simple instructions.
        </div>
        <div className='module-1-topic-1-instructions'>
          <div>1. When you enter the AR environment, you will be presented a 3D model.</div>
          <div>2. You will see 3 buttons, each representing a different action the 3D model will do.</div>
          <div>3. Tap all 3 buttons to complete the task and pass.</div>
          <div>4. Tap ‘Enter AR’ below. Enjoy!</div>
        </div>
      </div>
    )
  }

  const renderArButton = () => {
    if (areAllActionButtonsClicked) {
      return (
        <ARButton
          style={{
            backgroundColor: '#00a6fb',
            borderRadius: '20px',
            border: '0',
            color: '#f3fcec',
            maxWidth: '100%',
            padding: '20px',
            fontWeight: '700',
            fontSize: '20px',
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px'
          }}
        >
          Exit AR
        </ARButton>
      )
    }

    if (hasEnterAr) {
      return null
    }

    return (
      <ARButton
        style={{
          backgroundColor: '#00a6fb',
          borderRadius: '20px',
          border: '0',
          color: '#f3fcec',
          maxWidth: '100%',
          padding: '20px',
          fontWeight: '700',
          fontSize: '20px',
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px'
        }}
      />
    )
  }

  const renderActionButtons = () => {
    if (!hasEnterAr) {
      return null
    }

    return (
      <div className='module-1-topic-1-action-buttons' style={{}}>
        <button
          className='module-1-topic-1-action-button'
          onClick={() => {
            setAreActionButtonsClick({ ...areActionButtonsClick, button1: true })
            moveBanana(0)
          }}
        >
          Do acrobatic move
        </button>
        <button
          className='module-1-topic-1-action-button'
          onClick={() => {
            setAreActionButtonsClick({ ...areActionButtonsClick, button2: true })
            moveBanana(1)
          }}
        >
          Dance afrohouse dance
        </button>
        <button
          className='module-1-topic-1-action-button'
          onClick={() => {
            setAreActionButtonsClick({ ...areActionButtonsClick, button3: true })
            moveBanana(2)
          }}
        >
          Dance boogie dance
        </button>
      </div>
    )
  }

  const renderSuccessMessage = () => {
    if (!showSuccessMessage) {
      return null
    }

    return (
      <div className='module-1-topic-1-success-message'>
        <div className='success-message-content'>
          <div className='success-message-text'>
            You've just experienced programming by giving instructions to a 3D model on what to do.
          </div>
          <div className='success-message-text'>
            Essentially, programming is crafting or writing instructions for computers to complete tasks.
          </div>
          <button className='success-message-button' onClick={() => setShowSuccessMessage(false)}>
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderSuccessMessage()}
      {renderInstructions()}
      {renderArButton()}
      <Canvas>
        <XR onSessionStart={() => setHasEnterAr(true)} onSessionEnd={() => setHasEnterAr(false)}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Controllers />
          {hasEnterAr && <Model animationIndex={animationIndex} />}
        </XR>
      </Canvas>
      {renderActionButtons()}
    </>
  )
}

export default Module1Topic1
