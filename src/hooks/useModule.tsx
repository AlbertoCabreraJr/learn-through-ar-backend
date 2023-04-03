import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module from '../types/Module'
import fetcher from '../utils/fetcher'

const useModule = (moduleId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [module, setModule] = useState<Module | null>(null)
  const navigate = useNavigate()

  const getModule = async () => {
    try {
      setIsLoading(true)

      const { data } = await fetcher.get(`/modules/${moduleId}`)
      setModule(data)
    } catch (error) {
      console.error(error)
      navigate('/error', { replace: true })
    } finally {
      setIsLoading(false)
    }
  }

  const refetchModule = async () => {
    await getModule()
  }

  const updateModule = async ({
    moduleId,
    body
  }: {
    moduleId: string
    body: { progress?: number; finished?: boolean }
  }) => {
    try {
      setIsLoading(true)

      await fetcher.put(`/modules/${moduleId}`, {
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
    getModule()
  }, [moduleId])

  return { isLoading, module, refetchModule, updateModule }
}

export default useModule
