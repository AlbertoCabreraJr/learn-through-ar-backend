import React, { useEffect, useState } from 'react'
import Loader from '../../../../components/Loader'

type Props = {
  onFinish: () => void
  onExit: () => void
  hasEnterAr: boolean
  setHasEnterAr: React.Dispatch<React.SetStateAction<boolean>>
}

const Module3Topic1: React.FC<Props> = ({ hasEnterAr, onFinish, setHasEnterAr, onExit }) => {
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
    <div className='module-3-topic-1'>
      <div className='module-3-topic-1-title'>Arithmetic Operations</div>
      <div className='module-3-topic-1-subtitle'>
        No AR activity is included in this module. Instead, take a moment to read the following text, which provides a
        brief overview of arithmetic operations. It will only take 2-3 minutes of your time. When your finish, tap DONE
        below.
      </div>
      <div className='module-3-topic-1-content'>
        <div>
          Consider arithmetic operations as the fundamental math operations you studied in school, which include
          addition, subtraction, multiplication, and division. These operations are utilized in programming to carry out
          computations and make decisions based on the outcomes of these computations.
        </div>
        <div>
          For instance, if you need to calculate the combined cost of purchasing three items, you would sum up the price
          of each item. In programming, this addition is performed using the "+" operator. For example, 2 + 3 would give
          the result 5.
        </div>
        <div>
          Likewise, to ascertain the average of three numbers, you would divide their sum by the total count of items.
          In this case, programming employs the "/" operator for division. For example, (10 + 15 + 20) / 3 would give
          the result 15.
        </div>
        <div>
          Besides the basic arithmetic operations described above, programming introduces a unique operation called
          modulo. This operation, symbolized by the "%" sign, is utilized to compute the remainder resulting from a
          division operation.
        </div>
        <div>
          Take an example where you divide 10 by 3; the result is 3 with a surplus of 1. The modulo operator in
          programming enables you to acquire this remainder. Hence, 10 % 3 would give the result 1.
        </div>
        <div>
          It's crucial to note that arithmetic operations in programming go beyond basic calculations to form part of
          more intricate computations and algorithms. These operations are a crucial component of programming, and they
          feature in nearly every software application.
        </div>
        <div>
          In summary, arithmetic operations in programming are deployed for elementary mathematical computations and
          form a critical aspect of nearly all software applications.
        </div>
      </div>
      <button onClick={handleClickDone} className='module-3-topic-1-done-button'>
        Done
      </button>
    </div>
  )
}

export default Module3Topic1
