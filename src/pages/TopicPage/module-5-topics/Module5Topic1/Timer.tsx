import React, { useEffect, useState } from 'react'

type TimerProps = {
  showContent: boolean
  hasEnterAr: boolean
  duration: number
  start: boolean // New prop
  onStop: () => Promise<void>
}

const Timer: React.FC<TimerProps> = ({ hasEnterAr, showContent, duration, start, onStop }) => {
  if (!hasEnterAr || !showContent) {
    return null
  }
  const [counter, setCounter] = useState(duration)

  useEffect(() => {
    let timerId: NodeJS.Timeout

    // Only start the countdown if the start prop is true

    if (start) {
      // If counter is zero, call onStop and restart the counter
      if (!counter) {
        onStop()
        setCounter(duration)
      } else {
        // Decrease counter every second
        timerId = setInterval(() => {
          setCounter((counter) => counter - 1)
        }, 1000)
      }
    }

    // Clear interval on component unmount or when start prop changes to false
    return () => {
      if (timerId) clearInterval(timerId)
    }
  }, [counter, start])

  return (
    <div className='timer'>
      <div className='title'>Show hand in...</div>
      <div className='value'>{counter}</div>
    </div>
  )
}

export default Timer
