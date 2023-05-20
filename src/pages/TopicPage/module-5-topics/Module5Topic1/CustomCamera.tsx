import React, { useEffect } from 'react'

type CustomCameraProps = {
  showContent: boolean
  hasEnterAr: boolean
  videoRef: React.RefObject<HTMLVideoElement>
  onCameraLoaded: () => void
}

const CustomCamera: React.FC<CustomCameraProps> = ({ hasEnterAr, showContent, onCameraLoaded, videoRef }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  useEffect(() => {
    // Check if the browser supports media devices
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Access the camera and stream the video
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            onCameraLoaded()
          }
        })
        .catch((error) => {
          console.error('Error accessing camera:', error)
        })
    } else {
      console.error('Media devices are not supported.')
    }

    // Cleanup: stop streaming and remove the video source
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => {
          track.stop()
        })
        videoRef.current.srcObject = null
      }
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '40vh' }}>
      <video ref={videoRef} autoPlay height={400} style={{ width: '100%', objectFit: 'cover' }} />
    </div>
  )
}

export default CustomCamera
