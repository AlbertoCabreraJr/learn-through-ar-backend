import * as React from 'react'
import axios from 'axios'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'

type AuthContextProps = {
  isLoading?: boolean
  userToken?: string | null
  signOut?: () => void
  signIn?: () => void
}

type AuthState = {
  userToken: string | null
}

type Action = {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT'
  token: string | null
}

const AuthContext = React.createContext<AuthContextProps>({})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [state, dispatch] = React.useReducer(
    (prevState: AuthState, action: Action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return { ...prevState, userToken: action.token }
        case 'SIGN_IN':
          return { ...prevState, isSignout: false, userToken: action.token }
        case 'SIGN_OUT':
          return { ...prevState, isSignout: true, userToken: null }
        default:
          return prevState
      }
    },
    {
      userToken: null
    }
  )

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_STAGE}/auth`, {
          headers: {
            Authorization: codeResponse.code
          }
        })

        localStorage.setItem('aws', JSON.stringify(data.awsCredentials))
        localStorage.setItem('access_token', JSON.stringify(data.access_token))
        localStorage.setItem('refresh_token', JSON.stringify(data.refresh_token))
        localStorage.setItem('user', JSON.stringify(data.user))

        dispatch({ type: 'SIGN_IN', token: data.access_token })
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    },
    onError: (error) => {
      console.error(error)
      dispatch({ type: 'SIGN_OUT', token: null })
      setIsLoading(false)
    },
    onNonOAuthError: () => {
      setIsLoading(false)
    },
    flow: 'auth-code',
    // @ts-ignore
    access_type: 'offline'
  })

  React.useEffect(() => {
    const checkStoredAuthState = async () => {
      try {
        let access_token = localStorage.getItem('access_token')

        if (!access_token) {
          await authValues.signOut()
          return
        }

        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${JSON.parse(access_token)}`
        )

        if (isTokenExpired(data)) {
          await handleRefreshAccess()
          return
        }

        dispatch({ type: 'RESTORE_TOKEN', token: access_token })
      } catch (e) {
        await handleRefreshAccess()
      }
    }

    checkStoredAuthState()
  }, [])

  const handleRefreshAccess = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')

      if (!refreshToken) {
        dispatch({ type: 'SIGN_OUT', token: null })
        return
      }

      const parsedRefreshToken = JSON.parse(refreshToken)

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_STAGE}/auth-refresh`,
        {
          headers: {
            Authorization: parsedRefreshToken
          }
        }
      )

      localStorage.setItem('aws', JSON.stringify(data.awsCredentials))
      localStorage.setItem('access_token', JSON.stringify(data.access_token))

      dispatch({ type: 'RESTORE_TOKEN', token: data.access_token })
    } catch (error) {
      console.error(error)
    }
  }

  const authValues = React.useMemo(
    () => ({
      signIn: () => {
        setIsLoading(true)
        googleLogin()
      },
      signOut: async () => {
        try {
          setIsLoading(true)

          const token = localStorage.getItem('access_token')
          if (token) {
            googleLogout()
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            localStorage.removeItem('aws')
            localStorage.removeItem('user')
            const parseToken = JSON.parse(token)

            axios.post(
              'https://oauth2.googleapis.com/revoke',
              {
                token: parseToken
              },
              {
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                }
              }
            )
          }

          dispatch({ type: 'SIGN_OUT', token: null })
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
    }),
    [googleLogin]
  )

  const isTokenExpired = (token: any): boolean => {
    const currentTimeInSeconds = Date.now() / 1000
    return token.exp < currentTimeInSeconds
  }

  return <AuthContext.Provider value={{ ...authValues, ...state, isLoading }}>{children}</AuthContext.Provider>
}

const useAuthContext = () => React.useContext(AuthContext)

export { AuthProvider, useAuthContext }
