import chevronRight from '../../assets/chevronright.svg'
import check from '../../assets/check.svg'
import { useNavigate, useParams } from 'react-router-dom'
import Exam from '../../types/Exam'

const shouldDisabledExam = (exam: Exam, module: any) => {
  return !exam.finished && module.progress !== module.totalTopicsAndExam - 1
}

const ExamItem = ({ exam, module }: { exam: any; module: any }) => {
  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()

  let examItemClassname = 'exam-item'

  if (exam.finished) {
    examItemClassname += ' exam-item-finished'
  }

  if (shouldDisabledExam(exam, module)) {
    examItemClassname += ' exam-item-disabled'
  }

  return (
    <div
      className={examItemClassname}
      onClick={() => {
        if (shouldDisabledExam(exam, module)) {
          return
        }

        navigate(`/course/${courseId}/module/${moduleId}/exam/${exam._id}`)
      }}
    >
      <div className='exam-item-title'>{exam.title}</div>
      <RightIcon exam={exam} module={module} />
    </div>
  )
}

const RightIcon = ({ exam, module }: { exam: any; module: any }) => {
  if (exam.finished) return <img src={check} alt='Check' />

  if (shouldDisabledExam(exam, module)) return null

  return <img src={chevronRight} alt='Check' className='exam-item-chevron-right' />
}

export default ExamItem
