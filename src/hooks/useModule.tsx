import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module from '../types/Module'
import fetcher from '../utils/fetcher'

const useModule = ({ moduleId }: { moduleId: string }) => {
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
      navigate('/error')
    } finally {
      setIsLoading(false)
    }
  }

  const refetchModule = async () => {
    await getModule()
  }

  useEffect(() => {
    getModule()
  }, [])

  return { isLoading, module, refetchModule }
}

export default useModule
