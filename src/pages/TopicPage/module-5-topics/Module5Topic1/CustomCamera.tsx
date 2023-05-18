import React, { useEffect } from 'react'

type CustomCameraProps = {
  showContent: boolean
  hasEnterAr: boolean
  updateGesturePrediction: () => void
  gestureEstimator: any
  handposeModel: any
  videoRef: any
  setShouldStartTimer: any
}

const CustomCamera: React.FC<CustomCameraProps> = ({
  hasEnterAr,
  showContent,
  updateGesturePrediction,
  gestureEstimator,
  handposeModel,
  videoRef,
  setShouldStartTimer
}) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  useEffect(() => {
    if (handposeModel && gestureEstimator && videoRef.current) {
      updateGesturePrediction()
    }
  }, [handposeModel, gestureEstimator, videoRef.current])

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user'
          }
        })

        setShouldStartTimer(true)

        // @ts-ignore
        videoRef.current.srcObject = stream
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }

    startCamera()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video ref={videoRef} width={350} height={350} autoPlay />
    </div>
  )
}

export default CustomCamera
