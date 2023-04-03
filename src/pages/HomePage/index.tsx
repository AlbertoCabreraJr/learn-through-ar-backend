import LayoutWithNavigation from '../../components/LayoutWithNavigation'
import ModuleList from './ModuleList'
import { useNavigate, useParams } from 'react-router-dom'
import useCourse from '../../hooks/useCourse'
import Loader from '../../components/Loader'

const HomePage = () => {
  let { courseId } = useParams()
  const navigate = useNavigate()

  if (!courseId) {
    navigate('/error', { replace: true })
  }

  const { course, isLoading } = useCourse(courseId!)

  if (isLoading || !course) {
    return (
      <LayoutWithNavigation>
        <Loader />
      </LayoutWithNavigation>
    )
  }

  if (!isLoading && !course) {
    navigate('/error', { replace: true })
  }

  return (
    <LayoutWithNavigation>
      <div className='home-page'>
        <div className='home-page-title'>Programming Fundamentals</div>
        <ModuleList course={course} />
      </div>
    </LayoutWithNavigation>
  )
}

export default HomePage
