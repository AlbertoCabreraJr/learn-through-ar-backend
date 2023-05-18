import React, { useRef, useEffect } from 'react'

type Props = {
  startScreenshot: boolean
  onScreenshot: (imageData: string) => void
  hasEnterAR: boolean
}

const CustomCamera: React.FC<Props> = ({ startScreenshot, onScreenshot, hasEnterAR }) => {
  if (!hasEnterAR) {
    return null
  }

  const videoRef = useRef<HTMLVideoElement>(null)

  const captureScreenshot = (): void => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    const context = canvas.getContext('2d')

    if (context) {
      context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight)
      const imageData = canvas.toDataURL('image/png')
      onScreenshot(imageData)
    }
  }

  useEffect(() => {
    let stream: MediaStream

    const startCamera = async (): Promise<void> => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }

    const stopCamera = (): void => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }

    startCamera()

    return () => {
      stopCamera()
    }
  }, [])

  useEffect(() => {
    if (startScreenshot) {
      captureScreenshot()
    }
  }, [startScreenshot])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1
      }}
    >
      <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

export default CustomCamera
