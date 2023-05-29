import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutWithoutNavigation from '../../components/LayoutWithoutNavigation'
import Loader from '../../components/Loader'
import useCourse from '../../hooks/useCourse'
import useModule from '../../hooks/useModule'
import useTopic from '../../hooks/useTopic'
import Module1Topic1 from './module-1-topics/Module1Topic1'
import Module1Topic2 from './module-1-topics/Module1Topic2'
import Module1Topic3 from './module-1-topics/Module1Topic3'
import Module2Topic1 from './module-2-topics/Module2Topic1'
import Module3Topic1 from './module-3-topics/Module3Topic1'
import Module4Topic1 from './module-4-topics/Module4Topic1'
import Module5Topic1 from './module-5-topics/Module5Topic1'
import Module5Topic2 from './module-5-topics/Module5Topic2'

const TopicPage = () => {
  const navigate = useNavigate()
  const { courseId, moduleId, topicId } = useParams()

  const { topic, isLoading: isLoadingTopic, updateTopic } = useTopic(topicId!)
  const { module, isLoading: isLoadingModule, updateModule } = useModule(moduleId!)
  const { course, isLoading: isLoadingCourse, updateCourse } = useCourse(courseId!)
  const [hasEnterAr, setHasEnterAr] = useState(false)

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

  if (
    isLoadingTopic ||
    isLoadingModule ||
    isLoadingCourse ||
    !course ||
    !module ||
    !topic ||
    !courseId ||
    !moduleId ||
    !topicId
  ) {
    return (
      <LayoutWithoutNavigation
        onClickBack={() => navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })}
      >
        <Loader />
      </LayoutWithoutNavigation>
    )
  }

  const handleFinishTopic = async () => {
    // No need to update if topic is already finished
    if (topic.finished) {
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
  }

  const handleExit = () => {
    navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })
  }

  const renderTopic = (): React.ReactNode => {
    switch (module.moduleNumber) {
      case 1:
        if (topic.topicNumber === 1) {
          return (
            <Module1Topic1
              hasEnterAr={hasEnterAr}
              setHasEnterAr={setHasEnterAr}
              onFinish={handleFinishTopic}
              onExit={handleExit}
            />
          )
        }
        if (topic.topicNumber === 2) {
          return (
            <Module1Topic2
              hasEnterAr={hasEnterAr}
              setHasEnterAr={setHasEnterAr}
              onFinish={handleFinishTopic}
              onExit={handleExit}
            />
          )
        }
        if (topic.topicNumber === 3) {
          return (
            <Module1Topic3
              hasEnterAr={hasEnterAr}
              setHasEnterAr={setHasEnterAr}
              onFinish={() => {
                handleFinishTopic()
                navigate(`/course/${courseId}`, { replace: true })
              }}
            />
          )
        }
        return null

      case 2:
        if (topic.topicNumber === 1) {
          return <Module2Topic1 hasEnterAr={hasEnterAr} setHasEnterAr={setHasEnterAr} onFinish={handleFinishTopic} />
        }

        return null

      case 3:
        if (topic.topicNumber === 1) {
          return (
            <Module3Topic1
              hasEnterAr={hasEnterAr}
              setHasEnterAr={setHasEnterAr}
              onFinish={() => {
                handleFinishTopic()
                navigate(`/course/${courseId}`, { replace: true })
              }}
            />
          )
        }

        return null

      case 4:
        if (topic.topicNumber === 1) {
          return <Module4Topic1 hasEnterAr={hasEnterAr} setHasEnterAr={setHasEnterAr} onFinish={handleFinishTopic} />
        }

        return null

      case 5:
        if (topic.topicNumber === 1) {
          return <Module5Topic1 hasEnterAr={hasEnterAr} setHasEnterAr={setHasEnterAr} onFinish={handleFinishTopic} />
        }
        if (topic.topicNumber === 2) {
          return <Module5Topic2 hasEnterAr={hasEnterAr} setHasEnterAr={setHasEnterAr} onFinish={handleFinishTopic} />
        }

        return null

      default:
        return null
    }
  }

  if (hasEnterAr) {
    return <>{renderTopic()}</>
  }

  return (
    <LayoutWithoutNavigation onClickBack={() => navigate(`/course/${courseId}/module/${moduleId}`, { replace: true })}>
      {renderTopic()}
    </LayoutWithoutNavigation>
  )
}

export default TopicPage
