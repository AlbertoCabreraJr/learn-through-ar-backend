import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

type CustomImageProps = {
  position: THREE.Vector3
  scale: THREE.Vector3
  size: number[]
  url: string
}

const CustomImage: React.FC<CustomImageProps> = ({ scale, position, url, size }) => {
  const texture = useLoader(THREE.TextureLoader, url)

  return (
    <mesh scale={scale} position={position}>
      <planeBufferGeometry attach='geometry' args={size} />
      <meshBasicMaterial attach='material' map={texture} />
    </mesh>
  )
}

export default CustomImage
