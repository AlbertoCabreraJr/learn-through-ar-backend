import React, { Suspense, useState } from 'react'
import CustomBox from './CustomBox'
import { Interactive } from '@react-three/xr'
import useSound from 'use-sound'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const soundSuccess = require('../../../../assets/sounds/sound-success.mp3')
const soundError = require('../../../../assets/sounds/sound-error.mp3')

type BoxesProps = {
  onUpdateScore: (dataType: 'boolean' | 'integer' | 'float' | 'string') => void
  hasEnterAr: boolean
  currentDataType: 'boolean' | 'integer' | 'float' | 'string'
  showContent: boolean
  boxes: any[]
}

type BoxProps = {
  box: any
  onClick: (dataType: 'boolean' | 'integer' | 'float' | 'string') => void
  currentDataType: 'boolean' | 'integer' | 'float' | 'string'
}

const Boxes: React.FC<BoxesProps> = ({ currentDataType, hasEnterAr, onUpdateScore, showContent, boxes }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <>
      {boxes.map((box) => (
        <Box box={box} currentDataType={currentDataType} onClick={onUpdateScore} />
      ))}
    </>
  )
}

const Box: React.FC<BoxProps> = ({ onClick, currentDataType, box }) => {
  const [color, setColor] = useState('#00a6fb')
  const [playSoundSuccess] = useSound(soundSuccess)
  const [playSoundError] = useSound(soundError)
  const [hide, setHide] = useState(false)
  const titleTextColor = '#f3fcec'
  const titleFontSize = 0.05
  const titleTextPosition = new THREE.Vector3(0, 0, 0.06)

  const handleClick = () => {
    if (box.dataType !== currentDataType) {
      setColor('#ff3535')

      setTimeout(() => {
        setColor('#00a6fb')
      }, 500)

      return
    }

    playSoundSuccess()
    setHide(true)
    onClick(currentDataType)
  }

  if (hide) {
    return null
  }

  return (
    <Interactive onSelect={handleClick}>
      <CustomBox scale={new THREE.Vector3(0.6, 0.6, 0.6)} size={[0.4, 0.1, 0.1]} color={color} position={box.position}>
        <Suspense fallback={null}>
          <Text
            position={titleTextPosition}
            fontSize={titleFontSize}
            color={titleTextColor}
            anchorX='center'
            anchorY='middle'
          >
            {box.value}
          </Text>
        </Suspense>
      </CustomBox>
    </Interactive>
  )
}

export default Boxes
