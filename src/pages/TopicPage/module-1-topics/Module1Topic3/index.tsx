import React, { useEffect, useState } from 'react'
import Loader from '../../../../components/Loader'

type Props = {
  onFinish: () => void
  onExit: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module1Topic3: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr, onExit }) => {
  const [loading, setLoading] = useState(false)

  const handleClickDone = async () => {
    setLoading(true)
    onExit()
  }

  useEffect(() => {
    onFinish()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className='module-1-topic-3' onClick={onFinish}>
      <div className='module-1-topic-3-title'>How and Where A Program Is Written</div>
      <div className='module-1-topic-3-subtitle'>
        No AR activity is included in this module. Instead, take a moment to read the following text, which provides a
        brief overview of how and where a program is written. It will only take 2-3 minutes of your time. When your
        finish, tap DONE below.
      </div>
      <div className='module-1-topic-3-content'>
        <div>
          A program is typically written using a programming language, such as Python, Java, or C++. These languages
          provide a set of rules and syntax that programmers can use to write instructions that a computer can
          understand and execute.
        </div>
        <div>
          The process of writing a program involves several steps, including designing the program's architecture,
          writing the code, debugging, and testing the program to ensure it works as intended.
        </div>
        <div>
          Programs can be written using a variety of tools and environments, such as text editors, integrated
          development environments (IDEs), or code editors. These tools provide features to help with coding, such as
          syntax highlighting, auto-completion, and debugging tools.
        </div>
      </div>
      <button onClick={handleClickDone} className='module-1-topic-3-done-button'>
        Done
      </button>
    </div>
  )
}

export default Module1Topic3
