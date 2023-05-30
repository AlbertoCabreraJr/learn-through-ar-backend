import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Exam from '../types/Exam'
import fetcher from '../utils/fetcher'

const useExam = (examId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [exam, setExam] = useState<Exam | null>(null)
  const navigate = useNavigate()

  const getExam = async () => {
    try {
      setIsLoading(true)

      const { data } = await fetcher.get(`/exams/${examId}`)

      setExam(data)
    } catch (error) {
      console.error(error)
      navigate('/error', { replace: true })
    } finally {
      setIsLoading(false)
    }
  }

  const refetchExam = async () => {
    await getExam()
  }

  const updateExam = async ({
    examId,
    body
  }: {
    examId: string
    body: { finished: boolean; score: number; startTime?: any; endTime?: any }
  }) => {
    try {
      setIsLoading(true)

      await fetcher.put(`/exams/${examId}`, {
        ...body
      })
    } catch (error) {
      console.error(error)
      navigate('/error', { replace: true })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getExam()
  }, [examId])

  return { isLoading, exam, refetchExam, updateExam }
}

export default useExam
