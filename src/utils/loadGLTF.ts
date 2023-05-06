import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loadGLTF = (path: string) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(path, (gltf) => {
      resolve(gltf)
    })
  })
}

export default loadGLTF
