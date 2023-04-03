import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import useExam from '../../hooks/useExam'
import useModule from '../../hooks/useModule'
import Choice from '../../types/Choice'
import Exam from '../../types/Exam'
import ExamQuestion from './ExamQuestion'
import Score from './Score'

const ExamPage = () => {
  const navigate = useNavigate()
  const { courseId, moduleId, examId } = useParams()
  const { exam, isLoading: isLoadingExam, updateExam } = useExam(examId!)
  const { module, isLoading: isLoadingModule, updateModule } = useModule(moduleId!)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const [progress, setProgress] = useState(0)

  if (isLoadingExam || isLoadingModule || !exam || !module) {
    return (
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  if (!isLoadingExam && !isLoadingModule && (!exam || !module)) {
    navigate('/error', { replace: true })
  }

  const calculatePercentageProgress = (args: { exam: Exam; progress: number }): number => {
    const { exam, progress } = args

    return (100 / exam.questions.length) * progress
  }

  const handleConfirm = async (args: { finalChoice: Choice; correctChoice: Choice }): Promise<void> => {
    const { finalChoice, correctChoice } = args
    let newScore = score

    if (finalChoice._id === correctChoice._id) {
      newScore += 1
      setScore(newScore)
    }

    const newProgress = progress + 1

    if (newProgress === exam.questions.length) {
      if (!exam.finished && !module.finished) {
        await updateExam({
          examId: examId!,
          body: {
            finished: true,
            score: newScore
          }
        })

        await updateModule({
          moduleId: moduleId!,
          body: {
            finished: true,
            progress: module.progress + 1
          }
        })
      }

      setShowScore(true)
      return
    }

    setProgress(newProgress)
  }

  return (
    <>
      {showScore && (
        <Score
          examTitle={exam.title}
          totalScore={exam.questions.length}
          score={score}
          onClose={() => navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })}
        />
      )}
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <ProgressBar percentage={calculatePercentageProgress({ exam: exam!, progress })} />
        <div className='exam-page'>
          <ExamQuestion onConfirm={handleConfirm} question={exam.questions[progress]} />
        </div>
      </LayoutWithoutNavigation>
    </>
  )
}

export default ExamPage
