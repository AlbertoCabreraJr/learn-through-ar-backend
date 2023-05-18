import { useEffect, useRef, useState } from 'react'
import loadGLTF from '../../../../utils/loadGLTF'
import { useFrame } from '@react-three/fiber'
import { AnimationMixer, Vector3 } from 'three'
import { Interactive } from '@react-three/xr'

const Model = ({ animationIndex }: { animationIndex: number }) => {
  const [gltf, setGltf] = useState<any>(null)
  const [mixer, setMixer] = useState<any>(null)
  const modelRef = useRef()
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, -5))

  useEffect(() => {
    loadGLTF('https://learn-ar-xx69.s3.ap-southeast-1.amazonaws.com/assets/module-5/low_poly_train/scene.gltf')
      .then((gltf) => setGltf(gltf))
      .catch((error) => console.error('Error loading GLTF model:', error))
  }, [])

  // @ts-ignore
  useEffect(() => {
    if (gltf && animationIndex === 0) {
      const mixer = new AnimationMixer(modelRef.current!)
      const action = mixer.clipAction(gltf.animations.find((clip: any, index: number) => animationIndex === index))
      action.play()

      setMixer(mixer)

      return () => mixer.stopAllAction()
    }
  }, [animationIndex, gltf])

  useFrame((_, delta) => {
    if (mixer && animationIndex > 0) {
      mixer.stopAllAction()
    }

    // @ts-ignore
    if (mixer) {
      // @ts-ignore
      mixer.update(delta)
    }
  })

  return gltf ? (
    <Interactive>
      <primitive ref={modelRef} object={gltf.scene} scale={[0.3, 0.3, 0.3]} position={position} />
    </Interactive>
  ) : null
}

export default Model
