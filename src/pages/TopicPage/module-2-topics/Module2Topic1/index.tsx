import { Canvas } from '@react-three/fiber'
import { Controllers, XR } from '@react-three/xr'
import React, { useEffect, useState } from 'react'
import CustomARButton from './CustomARButton'
import Instructions from './Instructions'
import InsideARInstructions from './InsideARInstructions'
import FindInstructions from './FindInstructions'
import Scores from './Scores'
import Boxes from './Boxes'
import SuccessMessage from './SuccessMessage'
import useSound from 'use-sound'
import * as THREE from 'three'

const soundSuccess = require('../../../../assets/sounds/sound-success.mp3')

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module2Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const [playSound] = useSound(soundSuccess)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0)
  const instructions = [
    {
      title: 'START',
      details: ''
    },
    {
      title: 'Data Types',
      details: 'Data types help computers and programs process data efficiently and accurately.'
    },
    {
      title: 'Data Types',
      details: 'There are 4 most used data type.'
    },
    {
      title: `1. String Data Type`,
      details:
        'A string is a sequence of characters used to represent text. Usually inside a single quote or a double quote.'
    },
    {
      title: '2. Integer Data Type',
      details: 'Integer represents whole numbers'
    },
    {
      title: '3. Float Data Type',
      details: 'Float represents decimal numbers'
    },
    {
      title: ' 4. Boolean Data Type',
      details: 'Boolean represents true or false values'
    },
    {
      title: 'Exercise',
      details: 'In this exercise, you will locate various examples of a specific data type.'
    },
    {
      title: 'Exercise',
      details:
        "When you're in the AR environment, you'll see boxes that represent different data types. To select a box that represents a particular data type, simply DOUBLE-TAP on it."
    }
  ]

  const findInstructions = [
    <div>
      First, you need to find all the boxes that represent the <span style={{ fontWeight: '700' }}>STRING</span> data
      type. There are 5 of them.
    </div>,
    <div>
      Second, you need to find all the boxes that represent the <span style={{ fontWeight: '700' }}>INTEGER</span> data
      type. There are 5 of them.
    </div>,
    <div>
      Third, you need to find all the boxes that represent the <span style={{ fontWeight: '700' }}>FLOAT</span> data
      type. There are 5 of them.
    </div>,
    <div>
      Fourth, you need to find all the boxes that represent the <span style={{ fontWeight: '700' }}>BOOLEAN</span> data
      type. There are 2 of them.
    </div>
  ]

  const boxes = [
    {
      dataType: 'string',
      value: `"Elon Musk"`,
      position: new THREE.Vector3(0.5, 1.8, -0.3),
      scale: [],
      size: []
    },
    {
      dataType: 'string',
      value: `"Bali, Indonesia"`,
      position: new THREE.Vector3(0.5, 2.0, -0.5),
      scale: [],
      size: []
    },
    {
      dataType: 'string',
      value: `"Basketball"`,
      position: new THREE.Vector3(0.5, 2.2, -0.9),
      scale: [],
      size: []
    },
    {
      dataType: 'string',
      value: `"Aquaflask"`,
      position: new THREE.Vector3(0.5, 2.4, -1),
      scale: [],
      size: []
    },
    {
      dataType: 'string',
      value: `"Learn through AR"`,
      position: new THREE.Vector3(0.5, 2.6, -0.3),
      scale: [],
      size: []
    },
    {
      dataType: 'integer',
      value: 28,
      position: new THREE.Vector3(0.7, 1.8, -1.1),
      scale: [],
      size: []
    },
    {
      dataType: 'integer',
      value: 199,
      position: new THREE.Vector3(0.9, 2.0, -0.5),
      scale: [],
      size: []
    },
    {
      dataType: 'integer',
      value: 1122,
      position: new THREE.Vector3(0.7, 2.2, -0.5),
      scale: [],
      size: []
    },
    {
      dataType: 'integer',
      value: 123,
      position: new THREE.Vector3(0.2, 2.4, -0.8),
      scale: [],
      size: []
    },
    {
      dataType: 'integer',
      value: 0,
      position: new THREE.Vector3(0.9, 2.6, -0.3),
      scale: [],
      size: []
    },
    {
      dataType: 'float',
      value: 28.28,
      position: new THREE.Vector3(1, 1.8, -0.1),
      scale: [],
      size: []
    },
    {
      dataType: 'float',
      value: 9.02,
      position: new THREE.Vector3(1, 2.0, -0.1),
      scale: [],
      size: []
    },
    {
      dataType: 'float',
      value: '0.0',
      position: new THREE.Vector3(1, 2.2, -0.5),
      scale: [],
      size: []
    },
    {
      dataType: 'float',
      value: 1122.01,
      position: new THREE.Vector3(1, 2.4, -0.8),
      scale: [],
      size: []
    },
    {
      dataType: 'float',
      value: 25.5,
      position: new THREE.Vector3(1, 2.6, -1),
      scale: [],
      size: []
    },
    {
      dataType: 'boolean',
      value: 'true',
      position: new THREE.Vector3(1.4, 2.0, -0.1),
      scale: [],
      size: []
    },
    {
      dataType: 'boolean',
      value: 'false',
      position: new THREE.Vector3(1.4, 1.8, -0.3),
      scale: [],
      size: []
    },
    {
      dataType: '',
      value: '12.fxyz',
      position: new THREE.Vector3(1.2, 1.6, -0.9),
      scale: [],
      size: []
    },
    {
      dataType: '',
      value: 'true.12',
      position: new THREE.Vector3(0.5, 2.1, -0.7),
      scale: [],
      size: []
    },
    {
      dataType: '',
      value: '0.2xyz',
      position: new THREE.Vector3(1, 1.4, -0.7),
      scale: [],
      size: []
    },
    {
      dataType: '',
      value: 'truelse',
      position: new THREE.Vector3(1.1, 1.8, -0.9),
      scale: [],
      size: []
    },
    {
      dataType: '',
      value: 'false.99',
      position: new THREE.Vector3(0.8, 2.0, -0.9),
      scale: [],
      size: []
    }
  ]

  const [scores, setScores] = useState({
    boolean: 0,
    integer: 0,
    float: 0,
    string: 0
  })

  const [currentDataType, setCurrentDataType] = useState<'boolean' | 'string' | 'float' | 'integer'>('string')
  const dataTypeOrder = {
    string: 'integer',
    integer: 'float',
    float: 'boolean'
  }
  const [started, setStarted] = useState(false)
  const [closeInitialInstructions, setCloseInitialInstructions] = useState(false)
  const progress = (100 / instructions.length) * currentInstructionIndex
  const [currentFindInstructionIndex, setCurrentFindInstructionIndex] = useState(0)
  const [currentlyFinding, setCurrentlyFinding] = useState(false)
  const perfectScores = {
    boolean: 2,
    integer: 5,
    float: 5,
    string: 5
  }

  const handleFindInstructionButtonClick = () => {
    setCurrentlyFinding(true)
  }

  const handleUpdateScore = (dataType: 'boolean' | 'string' | 'float' | 'integer') => {
    const newScore = (scores[dataType] += 1)

    // all boxes were selected in a particular data type
    // done for a particular data type
    if (newScore === perfectScores[dataType]) {
      playSound()
      setScores({ ...scores, [currentDataType]: newScore })
      setCurrentlyFinding(false)
      setCurrentFindInstructionIndex(currentFindInstructionIndex + 1)
      // @ts-ignore
      setCurrentDataType(dataTypeOrder[currentDataType])

      return
    }

    setScores({ ...scores, [currentDataType]: newScore })
  }

  const isFinishedExercise = (): boolean => {
    // @ts-ignore
    const finish = Object.keys(scores).every((key) => scores[key] === perfectScores[key])

    if (finish) {
      onFinish()
    }

    return finish
  }

  return (
    <div className='module-2-topic-1'>
      <Instructions hasEnterAr={hasEnterAr} />
      <CustomARButton isFinish={isFinishedExercise()} hasEnterAr={hasEnterAr} />
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

      {/* We will show these instructions if the first set of instruction was closed. */}
      <FindInstructions
        showContent={
          closeInitialInstructions && currentFindInstructionIndex < findInstructions.length && !currentlyFinding
        }
        hasEnterAr={hasEnterAr}
        content={findInstructions[currentFindInstructionIndex]}
        onClick={handleFindInstructionButtonClick}
      />

      <Scores
        currentDataType={currentDataType}
        showContent={closeInitialInstructions}
        hasEnterAr={hasEnterAr}
        scores={scores}
      />

      <SuccessMessage hasEnterAr={hasEnterAr} showContent={isFinishedExercise()} />

      <Canvas>
        <XR onSessionStart={() => setHasEnterAr(true)} onSessionEnd={() => setHasEnterAr(false)}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Controllers />
          <Boxes
            boxes={boxes}
            currentDataType={currentDataType}
            hasEnterAr={hasEnterAr}
            onUpdateScore={handleUpdateScore}
            showContent={closeInitialInstructions && !isFinishedExercise()}
          />
        </XR>
      </Canvas>
    </div>
  )
}

export default Module2Topic1

// import React, { Suspense, useEffect, useRef, useState } from 'react'
// import { Interactive, XR, ARButton, Controllers } from '@react-three/xr'
// import { Text } from '@react-three/drei'
// import './styles.css'
// import { Canvas, useFrame } from '@react-three/fiber'
// import * as THREE from 'three'

// const Particle = ({ position, color, size }) => {
//   const meshRef = useRef()

//   useFrame(() => {
//     // Move particles downwards
//     // @ts-ignore
//     meshRef.current.position.y -= 0.001
//   })

//   return (
//     <mesh ref={meshRef} position={position}>
//       <circleGeometry args={[size, 32]} />
//       <meshBasicMaterial color={color} />
//     </mesh>
//   )
// }

// const ParticleSystem = ({ systemPosition, explode, color }: any) => {
//   const [particles, setParticles] = useState([])

//   // @ts-ignore
//   useEffect(() => {
//     if (explode) {
//       const numParticles = 500
//       const newParticles = []

//       for (let i = 0; i < numParticles; i++) {
//         const position = new THREE.Vector3(
//           systemPosition[0] + (Math.random() - 0.5) * 0.2,
//           systemPosition[1] + (Math.random() - 0.5) * 0.2,
//           systemPosition[2] + (Math.random() - 0.5) * 0.2
//         )
//         const size = 0.003 // Increase the size value

//         newParticles.push(<Particle key={i} position={position} color={color} size={size} />)
//       }

//       setParticles(newParticles)

//       // Remove particles after 2 seconds
//       const timer = setTimeout(() => {
//         setParticles([])
//       }, 2000)

//       // Clear the timer if the explosion is interrupted
//       return () => clearTimeout(timer)
//     }
//   }, [explode, systemPosition])

//   return <>{particles}</>
// }

// function Box({ color, size, scale, children, ...rest }) {
//   return (
//     <mesh scale={scale} {...rest}>
//       <boxBufferGeometry args={size} />
//       <meshPhongMaterial color={color} />
//       {children}
//     </mesh>
//   )
// }

// function Button(props) {
//   const [hover, setHover] = useState(false)
//   const [color, setColor] = useState('blue')
//   const [clicked, setClicked] = useState(false)
//   const [explode, setExplode] = useState(false)

//   const onSelect = () => {
//     setClicked(true)
//     setExplode(true)
//   }

//   if (clicked) {
//     return <ParticleSystem color={color} systemPosition={props.position} explode={explode} />
//   }

//   return (
//     <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
//       <Box color={color} scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]} size={[0.4, 0.1, 0.1]} {...props}>
//         <Suspense fallback={null}>
//           <Text position={[0, 0, 0.06]} fontSize={0.05} color='#000' anchorX='center' anchorY='middle'>
//             Hello react-xr!
//           </Text>
//         </Suspense>
//       </Box>
//     </Interactive>
//   )
// }

// export function App() {
//   const buttonPosition = [0, 0.1, -0.2]

//   return (
//     <>
//       <ARButton />
//       <Canvas>
//         <XR referenceSpace='local'>
//           <ambientLight />
//           <pointLight position={[10, 10, 10]} />
//           <Button position={buttonPosition} />
//           <Controllers />
//         </XR>
//       </Canvas>
//     </>
//   )
// }
