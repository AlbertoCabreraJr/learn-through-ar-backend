import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import useExam from '../../hooks/useExam'
import Exam from '../../types/Exam'
import { course } from '../../utils/mockData'

const ExamPage = () => {
  const navigate = useNavigate()
  const { courseId, moduleId, examId } = useParams()
  const { exam, isLoading: isLoadingExam } = useExam(examId!)

  const [progress, setProgress] = useState(1)

  if (isLoadingExam || !exam) {
    return (
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  if (!isLoadingExam && !exam) {
    navigate('/error', { replace: true })
  }

  const calculatePercentageProgress = (args: { exam: Exam; progress: number }): number => {
    const { exam, progress } = args

    return (100 / exam.questions.length) * progress
  }

  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
      <div className='exam-page'>
        <ProgressBar percentage={calculatePercentageProgress({ exam: exam!, progress })} />
      </div>
    </LayoutWithoutNavigation>
  )
}

export default ExamPage
