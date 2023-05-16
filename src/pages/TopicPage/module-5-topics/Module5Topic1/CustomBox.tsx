import React from 'react'
import * as THREE from 'three'

type CustomBoxProps = {
  color?: string
  size: number[]
  scale: THREE.Vector3
  children: React.ReactNode
  position?: THREE.Vector3
}

const CustomBox: React.FC<CustomBoxProps> = ({ color, size, scale, children, position }) => {
  return (
    <mesh scale={scale} position={position}>
      <boxBufferGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}

export default CustomBox
