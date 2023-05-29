import { ARButton } from '@react-three/xr'
import React from 'react'

type CustomARButtonProps = {
  isFinish: boolean
  hasEnterAr: boolean
}

const CustomARButton: React.FC<CustomARButtonProps> = ({ isFinish, hasEnterAr }) => {
  if (isFinish) {
    return (
      <ARButton
        style={{
          textAlign: 'center',
          backgroundColor: '#00a6fb',
          borderRadius: '20px',
          border: '0',
          color: '#f3fcec',
          maxWidth: '100%',
          padding: '20px',
          fontWeight: '700',
          fontSize: '20px',
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          zIndex: 999
        }}
      >
        Exit Activity
      </ARButton>
    )
  }

  if (hasEnterAr) {
    return null
  }

  return (
    <ARButton
      style={{
        textAlign: 'center',
        backgroundColor: '#00a6fb',
        borderRadius: '20px',
        border: '0',
        color: '#f3fcec',
        maxWidth: '100%',
        padding: '20px',
        fontWeight: '700',
        fontSize: '20px',
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 999
      }}
    >
      Start Activity
    </ARButton>
  )
}

export default CustomARButton
