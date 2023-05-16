import React, { useState } from 'react'
import Loader from '../../../../components/Loader'

type Props = {
  onFinish: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module3Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr }) => {
  const [loading, setLoading] = useState(false)

  const handleClickDone = async () => {
    setLoading(true)
    onFinish()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='module-3-topic-1'>
      <div className='module-3-topic-1-title'>Arithmetic Operations</div>
      <div className='module-3-topic-1-subtitle'>
        This module will not have any AR activity, as it's brief and easy to understand. Instead, please take a moment
        to read the text below to know about the arithmetic operations. It's just a 2-3 minutes read.
      </div>
      <div className='module-3-topic-1-content'>
        <div>
          Think of arithmetic operations as basic math operations you learned in school like addition, subtraction,
          multiplication, and division. In programming, we use these operations to perform calculations and make
          decisions based on the results of these calculations.
        </div>
        <div>
          For example, if you want to find out the total cost of buying three items, you would add the cost of each
          item. In programming, we use the "+" operator to perform this addition. Similarly, if you want to find out the
          average of three numbers, you would divide the sum of those numbers by the total number of items. In
          programming, we use the "/" operator to perform this division.
        </div>
        <div>
          It's important to understand that in programming, we not only perform simple arithmetic operations, but also
          use them in more complex calculations and algorithms. These operations are a fundamental building block of
          programming and are used in almost every application and software.
        </div>
        <div>
          In conclusion, arithmetic operations in programming are used to perform basic mathematical calculations and
          are an essential part of almost every application and software.
        </div>
      </div>
      <button onClick={handleClickDone} className='module-3-topic-1-done-button'>
        Done
      </button>
    </div>
  )
}

export default Module3Topic1
