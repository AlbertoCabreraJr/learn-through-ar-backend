import * as React from 'react'
import User from '../types/User'
import { useAuthContext } from './AuthContext'

type UserContextProps = {
  user?: User | null
  isLoading?: boolean
}

const UserContext = React.createContext<UserContextProps>({})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null)
  const { userToken } = useAuthContext()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      const storedUser = localStorage.getItem('user')

      if (!storedUser) {
        setUser(null)
        return
      }

      const parsedUser = JSON.parse(storedUser)

      setUser(parsedUser)
      setIsLoading(false)
    }

    getUser()
  }, [userToken])

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>
}

const useUserContext = () => React.useContext(UserContext)

export { UserProvider, useUserContext }
