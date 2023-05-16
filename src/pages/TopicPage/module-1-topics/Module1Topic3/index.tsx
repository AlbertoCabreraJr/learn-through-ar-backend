import React, { useState } from 'react'
import Loader from '../../../../components/Loader'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module1Topic3: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const [loading, setLoading] = useState(false)

  const handleClickDone = async () => {
    setLoading(true)
    onFinish()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='module-1-topic-3'>
      <div className='module-1-topic-3-title'>How and Where A Program Is Written</div>
      <div className='module-1-topic-3-subtitle'>
        This module will not have any AR activity, as it's brief and easy to understand. Instead, please take a moment
        to read the text below to know about the arithmetic operations. It's just a 2-3 minutes read.
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
