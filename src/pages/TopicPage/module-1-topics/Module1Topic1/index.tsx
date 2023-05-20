import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Controllers, XR } from '@react-three/xr'
import React, { useEffect, useRef, useState } from 'react'
import { AnimationMixer, Vector3 } from 'three'
import loadGLTF from '../../../../utils/loadGLTF'
import Instructions from './Instructions'
import SuccessMessage from './SuccessMessage'
import CustomARButton from './CustomARButton'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
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
      onFinish()
      setShowSuccessMessage(true)
    }
  }, [areActionButtonsClick.button1, areActionButtonsClick.button2, areActionButtonsClick.button3])

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

  return (
    <div className='module-1-topic-1'>
      <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />
      <Instructions hasEnterAr={hasEnterAr} />
      <CustomARButton isFinish={areAllActionButtonsClicked} hasEnterAr={hasEnterAr} />
      <Canvas>
        <XR onSessionStart={() => setHasEnterAr(true)} onSessionEnd={() => setHasEnterAr(false)}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Controllers />
          {hasEnterAr && <Model animationIndex={animationIndex} />}
        </XR>
      </Canvas>
      {renderActionButtons()}
    </div>
  )
}

export default Module1Topic1
