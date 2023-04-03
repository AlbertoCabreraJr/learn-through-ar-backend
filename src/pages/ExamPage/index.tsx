import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'

const ExamPage = () => {
  const { courseId, moduleId, examId } = useParams()
  const navigate = useNavigate()

  console.log(courseId, moduleId, examId)
  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
      <div className='exam-page'>ExamPage</div>
    </LayoutWithoutNavigation>
  )
}

export default ExamPage
