import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import useCourse from '../../hooks/useCourse'
import useModule from '../../hooks/useModule'
import useTopic from '../../hooks/useTopic'

const TopicPage = () => {
  const navigate = useNavigate()
  const { courseId, moduleId, topicId } = useParams()

  const { topic, isLoading: isLoadingTopic, updateTopic } = useTopic(topicId!)
  const { module, isLoading: isLoadingModule, updateModule } = useModule(moduleId!)
  const { course, isLoading: isLoadingCourse, updateCourse } = useCourse(courseId!)

  useEffect(() => {
    if (
      !isLoadingTopic &&
      !isLoadingModule &&
      !isLoadingCourse &&
      !course &&
      !module &&
      !topic &&
      !courseId &&
      !moduleId &&
      !topicId
    ) {
      navigate('/error', { replace: true })
    }
  }, [topic, module, course, isLoadingCourse, isLoadingModule, isLoadingTopic, courseId, moduleId, topicId, navigate])

  if (isLoadingTopic || isLoadingModule || isLoadingCourse) {
    return (
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  const handleFinishTopic = async () => {
    // No need to update if topic is already finished
    if (topic?.finished) {
      navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })
      return
    }

    await updateTopic({ topicId: topicId!, body: { finished: true } })
    await updateModule({ moduleId: moduleId!, body: { progress: module?.progress! + 1 } })

    const currentFinishedTopics = course?.finishedTopics ? course.finishedTopics : []
    const newFinishedTopics = [...currentFinishedTopics, topicId as string]

    const currentTopicIndex = module?.topics?.findIndex((topic) => topicId === topic._id)
    const newCurrentTopic = module?.topics[(currentTopicIndex as number) + 1]

    await updateCourse({
      courseId: courseId!,
      body: {
        finishedTopics: newFinishedTopics ? newFinishedTopics : [],
        currentTopic: newCurrentTopic?._id
      }
    })

    navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })
  }

  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
      <div className='topic-page' onClick={handleFinishTopic}>
        Topic Page
      </div>
    </LayoutWithoutNavigation>
  )
}

export default TopicPage
