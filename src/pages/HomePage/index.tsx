import LayoutWithNavigation from '../../components/LayoutWithNavigation'
import ModuleList from './ModuleList'
import { useNavigate, useParams } from 'react-router-dom'
import useCourse from '../../hooks/useCourse'
import Loader from '../../components/Loader'
import { useEffect, useState } from 'react'
import AllowCameraMessage from '../../components/AllowCameraMessage'

const HomePage = () => {
  let { courseId } = useParams()
  const navigate = useNavigate()
  const { course, isLoading } = useCourse(courseId!)
  const [showAllowCameraMessage, setShowAllowCameraMessage] = useState(false)

  const handleAskCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
    } catch (error) {
      setShowAllowCameraMessage(true)
    }
  }

  useEffect(() => {
    handleAskCameraAccess()

    if (!isLoading && !courseId && !course) {
      navigate('/error', { replace: true })
    }
  }, [isLoading, courseId, course, navigate])

  if (isLoading || !course || !courseId) {
    return (
      <LayoutWithNavigation>
        <Loader />
      </LayoutWithNavigation>
    )
  }

  if (showAllowCameraMessage) {
    return <AllowCameraMessage />
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
