import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Course from '../types/Course'
import fetcher from '../utils/fetcher'

const useCourse = (courseId?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)
  const navigate = useNavigate()

  const getCourse = async () => {
    try {
      setIsLoading(true)

      const { data } = await fetcher.get(`/courses/${courseId}`)

      setCourse(data)
    } catch (error) {
      console.error(error)
      navigate('/error')
    } finally {
      setIsLoading(false)
    }
  }

  const refetchCourse = async () => {
    await getCourse()
  }

  const updateCourse = async ({
    courseId,
    body
  }: {
    courseId: string
    body: {
      currentModule?: string
      currentTopic?: string
      finishedModules?: string[]
      finishedTopics?: string[]
    }
  }) => {
    try {
      setIsLoading(false)

      await fetcher.put(`/courses/${courseId}`, {
        ...body
      })
    } catch (error) {
      console.error(error)
      navigate('/error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (courseId) {
      getCourse()
    }
  }, [courseId])

  return { isLoading, course, refetchCourse, updateCourse }
}

export default useCourse
