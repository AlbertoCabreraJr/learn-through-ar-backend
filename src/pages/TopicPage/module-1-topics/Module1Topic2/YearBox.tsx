// import { Text } from '@react-three/drei'
// import { useFrame, useThree } from '@react-three/fiber'
// import { Interactive, useXR } from '@react-three/xr'
// import React, { Suspense, useEffect, useRef, useState } from 'react'
// import { Euler, Vector3 } from 'three'

// type Props = {
//   onClick: () => void
//   title: string
//   position: Vector3
// }

// const YearBox: React.FC<Props> = ({ onClick, title, position }) => {
//   const [finalPosition, setFinalPosition] = useState<Vector3>(position)
//   const modelRef = useRef()

//   const handleSelect = () => {
//     onClick()
//   }

//   return (
//     <Interactive onSelect={handleSelect}>
//       {/* @ts-ignore */}
//       <mesh ref={modelRef} scale={[5, 5, 5]} position={finalPosition}>
//         <boxGeometry args={[0.4, 0.1, 0.1]} />
//         <meshPhongMaterial color='#00a6fb' />
//         <Suspense fallback={null}>
//           <Text
//             strokeWidth={10}
//             position={[0, 0, 0.06]}
//             fontSize={0.05}
//             color='white'
//             anchorX='center'
//             anchorY='middle'
//           >
//             {/* {title} */}
//             {/* @ts-ignore */}
//             {JSON.stringify(modelRef?.current?.matrixWorld)}
//           </Text>
//         </Suspense>
//       </mesh>
//     </Interactive>
//   )
// }

// export default YearBox

import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Interactive, useXR } from '@react-three/xr'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Euler, Vector3 } from 'three'

type Props = {
  onClick: () => void
  title: string
  position: Vector3
}

const YearBox: React.FC<Props> = ({ onClick, title, position }) => {
  const [finalPosition, setFinalPosition] = useState<Vector3>(position)
  const modelRef = useRef()

  const { camera } = useThree()

  useEffect(() => {
    // @ts-ignore
    const distance = camera.position.distanceTo(modelRef.current.position)
    const adjustedPosition = new Vector3(position.x, position.y, position.z - distance)
    setFinalPosition(adjustedPosition)
  }, [camera.position, position])

  const handleSelect = () => {
    onClick()
  }

  return (
    <Interactive onSelect={handleSelect}>
      {/* @ts-ignore */}
      <mesh ref={modelRef} scale={[5, 5, 5]} position={finalPosition}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshPhongMaterial color='#00a6fb' />
        <Suspense fallback={null}>
          <Text
            strokeWidth={10}
            position={[0, 0, 0.06]}
            fontSize={0.05}
            color='white'
            anchorX='center'
            anchorY='middle'
          >
            {/* {title} */}
            {/* @ts-ignore */}
            {JSON.stringify(modelRef?.current?.matrixWorld)}
          </Text>
        </Suspense>
      </mesh>
    </Interactive>
  )
}

export default YearBox
