import { useEffect, useState } from 'react'
import Course from '../types/Course'
import fetcher from '../utils/fetcher'

const useCourse = ({ courseId }: { courseId: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)

  const getCourse = async () => {
    try {
      setIsLoading(true)

      const { data } = await fetcher.get(`/courses/${courseId}`)

      setCourse(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const refetchCourse = async () => {
    await getCourse()
  }

  useEffect(() => {
    getCourse()
  }, [])

  return { isLoading, course, refetchCourse }
}

export default useCourse
