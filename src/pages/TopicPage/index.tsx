import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import useCourse from '../../hooks/useCourse'
import useModule from '../../hooks/useModule'
import useTopic from '../../hooks/useTopic'

const TopicPage = () => {
  const navigate = useNavigate()
  const { courseId, topicId, moduleId } = useParams()

  if (!courseId || !topicId || !moduleId) {
    navigate('/error', { replace: true })
  }

  const { isLoading: isLoadingTopic, topic, updateTopic } = useTopic(topicId!)
  const { updateModule, module, isLoading: isLoadingModule } = useModule(moduleId!)
  const { updateCourse, course, isLoading: isLoadingCourse } = useCourse(courseId!)

  if (isLoadingTopic || isLoadingModule || isLoadingCourse || !topic || !module || !course) {
    return (
      <LayoutWithoutNavigation onClickBack={() => navigate(-1)}>
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  if (!isLoadingTopic && !isLoadingModule && !isLoadingCourse && (!topic || !module || !course)) {
    navigate('/error', { replace: true })
  }

  const handleFinishTopic = async () => {
    // No need to update if topic is already finished
    if (topic?.finished) {
      navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })
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
