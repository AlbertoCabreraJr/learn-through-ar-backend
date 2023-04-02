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
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_STAGE}/auth`, {
        headers: {
          Authorization: codeResponse.code
        }
      })

      localStorage.setItem('aws', JSON.stringify(data.awsCredentials))
      localStorage.setItem('id_token', JSON.stringify(data.id_token))
      localStorage.setItem('user', JSON.stringify(data.user))

      dispatch({ type: 'SIGN_IN', token: data.id_token })
      setIsLoading(false)
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
      let idToken = null

      try {
        idToken = localStorage.getItem('id_token')

        if (!idToken) {
          dispatch({ type: 'SIGN_OUT', token: null })
          return
        }

        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${JSON.parse(idToken)}`
        )

        if (isTokenExpired(data)) {
          dispatch({ type: 'SIGN_OUT', token: null })
          return
        }

        dispatch({ type: 'RESTORE_TOKEN', token: idToken })
      } catch (e) {
        dispatch({ type: 'SIGN_OUT', token: null })
      }
    }

    checkStoredAuthState()
  }, [])

  const authValues = React.useMemo(
    () => ({
      signIn: () => {
        setIsLoading(true)
        googleLogin()
      },
      signOut: async () => {
        setIsLoading(true)

        const token = localStorage.getItem('id_token')
        if (token) {
          googleLogout()
          localStorage.removeItem('id_token')
          localStorage.removeItem('aws')
          localStorage.removeItem('user')
        }

        dispatch({ type: 'SIGN_OUT', token: null })
        setIsLoading(false)
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
