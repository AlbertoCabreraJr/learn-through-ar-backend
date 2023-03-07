import React, { useEffect, useState } from 'react'
import { useIsDesktop } from './hooks/useIsDesktop'

const App = () => {
  const { isDesktop } = useIsDesktop()

  return <div>{isDesktop ? <h1>You are on a desktop device</h1> : <h1>You are on a mobile device</h1>}</div>
}

export default App
