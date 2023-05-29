import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import useCourse from '../../hooks/useCourse'
import useExam from '../../hooks/useExam'
import useModule from '../../hooks/useModule'
import Choice from '../../types/Choice'
import Exam from '../../types/Exam'
import ExamExitMessage from './ExamExitMessage'
import ExamQuestion from './ExamQuestion'
import ExamTakenMessage from './ExamTakenMessage'
import Score from './Score'
import Question from '../../types/Question'

const ExamPage = () => {
  const navigate = useNavigate()
  const { courseId, moduleId, examId } = useParams()
  const { course, isLoading: isLoadingCourse, updateCourse } = useCourse(courseId!)
  const { exam, isLoading: isLoadingExam, updateExam } = useExam(examId!)
  const { module, isLoading: isLoadingModule, updateModule } = useModule(moduleId!)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showExamTakenMessage, setShowExamTakenMessage] = useState(exam?.finished)
  const [showExitMessage, setShowExitMessage] = useState(false)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    setShowExamTakenMessage(exam?.finished)

    if (
      !isLoadingCourse &&
      !isLoadingExam &&
      !isLoadingModule &&
      !exam &&
      !module &&
      !course &&
      !courseId &&
      !moduleId &&
      examId
    ) {
      navigate('/error', { replace: true })
    }
  }, [isLoadingCourse, isLoadingExam, isLoadingModule, course, module, exam, courseId, moduleId, examId, navigate])

  if (isLoadingCourse || isLoadingExam || isLoadingModule || !exam || !module || !course) {
    return (
      <LayoutWithoutNavigation
        onClickBack={() => navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })}
      >
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  const calculatePercentageProgress = (args: { exam: Exam; progress: number }): number => {
    const { exam, progress } = args

    return (100 / exam.questions.length) * progress
  }

  const handleConfirm = async (args: {
    question: Question
    finalChoice: Choice
    correctChoice: Choice
  }): Promise<void> => {
    const { finalChoice, correctChoice, question } = args
    let newScore = score

    if (finalChoice._id === correctChoice._id) {
      newScore += 1
      setScore(newScore)
      setResults((prev) => [...prev, { question, isCorrect: true, finalChoice }])
    } else {
      setResults((prev) => [...prev, { question, isCorrect: false, finalChoice }])
    }

    const newProgress = progress + 1

    if (newProgress === exam.questions.length) {
      if (exam.finished && module.finished) {
        setShowScore(true)
        return
      }

      setShowScore(true)

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

      const currentFinishedModules = course?.finishedModules ? course.finishedModules : []
      const newFinishedModules = [...currentFinishedModules, moduleId as string]

      const currentModuleIndex = course?.modules?.findIndex((module) => moduleId === module._id)
      const newCurrentModule = course?.modules[(currentModuleIndex as number) + 1]

      // no new module left
      if (!newCurrentModule) {
        await updateCourse({
          courseId: courseId!,
          body: {
            finishedModules: newFinishedModules ? newFinishedModules : []
          }
        })
      } else {
        await updateCourse({
          courseId: courseId!,
          body: {
            finishedModules: newFinishedModules ? newFinishedModules : [],
            currentModule: newCurrentModule?._id,
            currentTopic: newCurrentModule.topics[0]._id
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
      {showExitMessage && (
        <ExamExitMessage
          onClickNo={() => setShowExitMessage(false)}
          onClickYes={() => navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })}
        />
      )}
      {showExamTakenMessage && <ExamTakenMessage onClose={() => setShowExamTakenMessage(false)} />}
      {showScore && (
        <Score
          results={results}
          examTitle={exam.title}
          totalScore={exam.questions.length}
          score={score}
          onClose={() => navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })}
        />
      )}
      <LayoutWithoutNavigation
        onClickBack={() => {
          setShowExitMessage(true)
        }}
      >
        <ProgressBar percentage={calculatePercentageProgress({ exam: exam!, progress })} />
        <div className='exam-page'>
          <ExamQuestion onConfirm={handleConfirm} question={exam.questions[progress]} />
        </div>
      </LayoutWithoutNavigation>
    </>
  )
}

export default ExamPage
