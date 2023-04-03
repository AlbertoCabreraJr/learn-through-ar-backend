import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topic from '../types/Topic'
import fetcher from '../utils/fetcher'

const useTopic = (topicId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [topic, setTopic] = useState<Topic | null>(null)
  const navigate = useNavigate()

  const getTopic = async () => {
    try {
      setIsLoading(true)

      const { data } = await fetcher.get(`/topics/${topicId}`)

      setTopic(data)
    } catch (error) {
      console.error(error)
      navigate('/error')
    } finally {
      setIsLoading(false)
    }
  }

  const refetchTopic = async () => {
    await getTopic()
  }

  const updateTopic = async ({ topicId, body }: { topicId: string; body: { finished: boolean } }) => {
    try {
      setIsLoading(true)

      await fetcher.put(`/topics/${topicId}`, {
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
    getTopic()
  }, [topicId])

  return { isLoading, topic, refetchTopic, updateTopic }
}

export default useTopic
