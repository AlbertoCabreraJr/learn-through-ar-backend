import * as React from 'react'
import { useAuthContext } from './AuthContext'

type User = {
  name: string
  email: string
  course: string
}

type UserContextProps = {
  user?: User | null
}

const UserContext = React.createContext<UserContextProps>({})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null)
  const { userToken } = useAuthContext()

  React.useEffect(() => {
    const getUser = async () => {
      const storedUser = localStorage.getItem('user')

      if (!storedUser) {
        setUser(null)
        return
      }

      const parsedUser = JSON.parse(storedUser)

      setUser(parsedUser)
    }

    getUser()
  }, [userToken])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

const useUserContext = () => React.useContext(UserContext)

export { UserProvider, useUserContext }
