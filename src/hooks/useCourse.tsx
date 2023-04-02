import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Course from '../types/Course'
import User from '../types/User'
import fetcher from '../utils/fetcher'

const useCourse = ({ courseId }: { courseId?: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)
  const navigate = useNavigate()

  const getCourse = async () => {
    try {
      setIsLoading(true)

      const storedUser = localStorage.getItem('user')

      if (!storedUser) {
        return
      }

      const parsedUser = JSON.parse(storedUser) as User

      const id = courseId ?? parsedUser.course

      const { data } = await fetcher.get(`/courses/${id}`)

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

  useEffect(() => {
    getCourse()
  }, [])

  return { isLoading, course, refetchCourse }
}

export default useCourse
