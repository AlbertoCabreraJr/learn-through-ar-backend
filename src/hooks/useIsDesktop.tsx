import { useEffect, useState } from 'react'

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    setIsDesktop(userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) === null)
  }, [])

  return { isDesktop }
}

export default useIsDesktop
