import logo from '../assets/logo.svg'
import google from '../assets/google.svg'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import { useEffect } from 'react'

const SignInPage = () => {
  const navigate = useNavigate()
  const { signIn, userToken, isLoading } = useAuthContext()

  useEffect(() => {
    if (userToken) {
      navigate('/')
    }
  }, [userToken, isLoading])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='signin-page'>
      <div className='logo-container'>
        <img className='image' src={logo} alt='Learn through AR logo' />
        <div className='text'>Learn through AR</div>
      </div>
      <button
        className='google-signin-button'
        onClick={() => {
          signIn && signIn()
        }}
      >
        <img src={google} alt='Google logo' />
        <div className='text'>Sign-in with google</div>
      </button>
    </div>
  )
}

export default SignInPage
