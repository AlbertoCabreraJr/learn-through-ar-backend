import { Canvas } from '@react-three/fiber'
import { ARButton, Controllers, XR } from '@react-three/xr'
import React from 'react'
import YearBox from './YearBox'
import { Vector3 } from 'three'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module1Topic2: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const renderInstructions = () => {
    if (hasEnterAr) {
      return null
    }

    return (
      <div className='module-1-topic-2'>
        <div className='module-1-topic-2-title' onClick={onFinish}>
          Objective
        </div>
        <div className='module-1-topic-2-subtitle'>
          Welcome! Before entering the AR environment, read these instructions.
        </div>
        <div className='module-1-topic-2-instructions'>
          <div>1. When you enter the AR environment, you will see buttons. </div>
          <div>2. These buttons represent each event in the timeline.</div>
          <div>3. Tap the buttons.</div>
          <div>4. When you tap, you will be presented a text of information regarding that event.</div>
          <div>5. After reading, tap OK.</div>
          <div>6. You need to tap OK in each timeline, so that it will record your progress.</div>
          <div>7. Tap ‘Enter AR’ below. Enjoy!</div>
        </div>
      </div>
    )
  }

  const renderArButton = () => {
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

  return (
    <>
      {renderInstructions()}
      {renderArButton()}
      <Canvas>
        <XR
          referenceSpace='unbounded'
          onSessionStart={() => setHasEnterAr(true)}
          onSessionEnd={() => setHasEnterAr(false)}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Controllers />
        </XR>
      </Canvas>
    </>
  )
}

export default Module1Topic2

{
  /* <YearBox title='1800s' onClick={() => {}} position={new Vector3(0, 2, -5)} />
<YearBox title='1900s' onClick={() => {}} position={new Vector3(5, 2, -5)} /> */
}
