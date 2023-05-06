import { Interactive } from '@react-three/xr'
import CustomBox from './CustomBox'
import { Suspense, useState } from 'react'
import { Text } from '@react-three/drei'
import CustomImage from './CustomImage'
import * as THREE from 'three'

type HistoryEventProps = {
  year: number
  titlePosition: THREE.Vector3
  imageUrl: string
  imageScale: THREE.Vector3
  imageSize: number[]
  imagePosition: THREE.Vector3
  onTap: (year: number) => void
}

const HistoryEvent: React.FC<HistoryEventProps> = ({
  year,
  titlePosition,
  imageUrl,
  imageScale,
  imageSize,
  imagePosition,
  onTap
}) => {
  const originalPosition = titlePosition
  const titleScale = new THREE.Vector3(0.5, 0.5, 0.5)
  const titleSize = [0.4, 0.1, 0.1]
  const titleFontSize = 0.05
  const titleTextPosition = new THREE.Vector3(0, 0, 0.06)
  const titleTextColor = '#003075'
  const [titleBoxColor, setTitleBoxColor] = useState('#00A6FB')

  return (
    <Interactive
      onSelect={() => {
        setTitleBoxColor('#9ff68a')
        onTap(year)
      }}
    >
      <CustomBox color={titleBoxColor} scale={titleScale} size={titleSize} position={originalPosition}>
        <Suspense fallback={null}>
          <Text
            position={titleTextPosition}
            fontSize={titleFontSize}
            color={titleTextColor}
            anchorX='center'
            anchorY='middle'
          >
            {`•    ${year}s   •`}
          </Text>
        </Suspense>
      </CustomBox>
      <Suspense fallback={null}>
        <CustomImage scale={imageScale} size={imageSize} url={imageUrl} position={imagePosition} />
      </Suspense>
    </Interactive>
  )
}

export default HistoryEvent
