import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import useCourse from '../../hooks/useCourse'
import useModule from '../../hooks/useModule'
import ExamItem from './ExamItem'
import TopicList from './TopicList'

const ModulePage = () => {
  const navigate = useNavigate()
  const { courseId, moduleId } = useParams()
  const { module, isLoading: isLoadingModule } = useModule(moduleId!)
  const { course, isLoading: isLoadingCourse } = useCourse(courseId!)

  useEffect(() => {
    if (!isLoadingCourse && !isLoadingModule && !moduleId && !courseId && !course && !module) {
      navigate('/error', { replace: true })
    }
  }, [course, module, courseId, moduleId, isLoadingCourse, isLoadingModule, navigate])

  if (isLoadingCourse || isLoadingModule || !module || !course) {
    return (
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(`/course/${courseId}`, { replace: true })}>
      <div className='module-page'>
        <div className='module-page-header'>
          <div className='module-page-title-container'>
            <div className='module-title'>{module.title}</div>
            <div className='module-subtitle'>{module.subtitle}</div>
          </div>
          <div className='module-progress'>
            Progress: {module.progress}/{module.totalTopicsAndExam}
          </div>
        </div>
        <TopicList course={course!} module={module} topics={module.topics} />
        <ExamItem exam={module.exam} module={module} />
      </div>
    </LayoutWithoutNavigation>
  )
}

export default ModulePage
