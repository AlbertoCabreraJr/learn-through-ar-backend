import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import { useUserContext } from '../../context/UserContext'
import useCourse from '../../hooks/useCourse'
import useModule from '../../hooks/useModule'
import ExamItem from './ExamItem'
import TopicList from './TopicList'

const ModulePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { user, isLoading: isLoadingUserContext } = useUserContext()
  const { module, isLoading: isLoadingModule } = useModule({ moduleId: id! })
  const { course, isLoading: isLoadingCourse } = useCourse({ courseId: user?.course! })

  if (isLoadingCourse || isLoadingModule || isLoadingUserContext || !user) return <div>Loading</div>

  if (!module || !course) return <div>Module does not exist</div>

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
        <TopicList topics={module.topics} course={course!} />
        <ExamItem exam={module.exam} module={module} />
      </div>
    </LayoutWithoutNavigation>
  )
}

export default ModulePage
