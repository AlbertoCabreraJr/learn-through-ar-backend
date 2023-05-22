import { Canvas } from '@react-three/fiber'
import { Controllers, XR } from '@react-three/xr'
import React, { useState } from 'react'
import Instructions from './Instructions'
import CustomARButton from './CustomARButton'
import * as THREE from 'three'
import HistoryEvent from './HistoryEvent'
import historyEventInformation from './historyEventInformation'
import InformationMessage from './InformationMessage'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module1Topic2: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const TOTAL_HISTORY_EVENTS = Object.values(historyEventInformation).length
  const [information, setInformation] = useState('')
  const [tappedYears, setTappedYears] = useState<number[]>([])
  const [currentTappedYear, setCurrentTappedYear] = useState(0)
  const [isFinish, setIsFinish] = useState(false)

  const handleTap = (year: number) => {
    setInformation(historyEventInformation[year])
    setCurrentTappedYear(year)

    if (tappedYears.includes(year)) {
      return
    }

    const newTappedYears = [...tappedYears, year]
    setTappedYears(newTappedYears)

    if (newTappedYears.length === TOTAL_HISTORY_EVENTS) {
      onFinish()
      setIsFinish(true)
    }
  }

  return (
    <div className='module-1-topic-2'>
      <Instructions hasEnterAr={hasEnterAr} />
      <CustomARButton isFinish={isFinish} hasEnterAr={hasEnterAr} />
      <InformationMessage year={currentTappedYear} information={information} hasEnterAr={hasEnterAr} />

      <Canvas>
        <XR onSessionStart={() => setHasEnterAr(true)} onSessionEnd={() => setHasEnterAr(false)}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {hasEnterAr && (
            <>
              <HistoryEvent
                year={1800}
                titlePosition={new THREE.Vector3(0, 1.8, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1800s.png'
                imagePosition={new THREE.Vector3(0, 1.65, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={1940}
                titlePosition={new THREE.Vector3(0.3, 1.8, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1940s.png'
                imagePosition={new THREE.Vector3(0.3, 1.65, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={1950}
                titlePosition={new THREE.Vector3(0.6, 1.8, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1950s.png'
                imagePosition={new THREE.Vector3(0.6, 1.65, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={1960}
                titlePosition={new THREE.Vector3(0.9, 1.8, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1960s.png'
                imagePosition={new THREE.Vector3(0.9, 1.65, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={1970}
                titlePosition={new THREE.Vector3(1.2, 1.8, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1970s.png'
                imagePosition={new THREE.Vector3(1.2, 1.65, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />

              <HistoryEvent
                year={1980}
                titlePosition={new THREE.Vector3(0, 1.45, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1980s.png'
                imagePosition={new THREE.Vector3(0, 1.35, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={1990}
                titlePosition={new THREE.Vector3(0.3, 1.45, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/1990s.png'
                imagePosition={new THREE.Vector3(0.3, 1.35, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={2000}
                titlePosition={new THREE.Vector3(0.6, 1.45, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/2000s.png'
                imagePosition={new THREE.Vector3(0.6, 1.35, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={2010}
                titlePosition={new THREE.Vector3(0.9, 1.45, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/2010s.png'
                imagePosition={new THREE.Vector3(0.9, 1.35, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
              <HistoryEvent
                year={2020}
                titlePosition={new THREE.Vector3(1.2, 1.45, -0.3)}
                imageUrl='https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-1/2020s.png'
                imagePosition={new THREE.Vector3(1.2, 1.35, -0.3)}
                imageScale={new THREE.Vector3(0.5, 0.5, 1.5)}
                imageSize={[0.4, 0.4]}
                onTap={handleTap}
              />
            </>
          )}
          <Controllers />
        </XR>
      </Canvas>
    </div>
  )
}

export default Module1Topic2
