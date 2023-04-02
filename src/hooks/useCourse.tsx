import { useState } from 'react'
import Course from '../types/Course'
import fetcher from '../utils/fetcher'

const useCourse = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)

  const getCourse = async (args: { courseId: string }): Promise<Course | null> => {
    try {
      const { data } = await fetcher.get('https://api.publicapis.org/entries')
      return null
    } catch (error) {
      console.error(error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, course }
}

export default useCourse
