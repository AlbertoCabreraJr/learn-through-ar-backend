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

  if (!courseId || !moduleId) {
    navigate('/error', { replace: true })
  }

  const { module, isLoading: isLoadingModule } = useModule(moduleId!)
  const { course, isLoading: isLoadingCourse } = useCourse(courseId!)

  if (isLoadingCourse || isLoadingModule || !module || !course) {
    return (
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  if (!isLoadingCourse && !isLoadingModule && (!module || !course)) {
    navigate('/error', { replace: true })
  }

  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
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
