import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import ProgressBar from '../../components/ProgressBar'

const ExamPage = () => {
  const { courseId, moduleId, examId } = useParams()
  const navigate = useNavigate()

  console.log(courseId, moduleId, examId)
  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
      <div className='exam-page'>
        <ProgressBar percentage={20} />
      </div>
    </LayoutWithoutNavigation>
  )
}

export default ExamPage
