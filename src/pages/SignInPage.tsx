import logo from '../assets/logo.svg'
import google from '../assets/google.svg'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import { Suspense, useEffect } from 'react'
import { useUserContext } from '../context/UserContext'

const SignInPage = () => {
  const navigate = useNavigate()
  const { signIn, userToken, isLoading } = useAuthContext()
  const { user } = useUserContext()

  useEffect(() => {
    if (!isLoading && userToken && user) {
      navigate(`/course/${user.course}`, { replace: true })
    }
  }, [userToken, isLoading, navigate, user])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Suspense fallback={<Loader />}>
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
        <div className='footer'>
          <div className='device-supported-text'>Make sure your device is supported</div>
          <a
            className='supported-devices-link'
            target='_blank'
            href='https://developers.google.com/ar/devices#google_play_devices'
          >
            See supported devices
          </a>
        </div>
      </div>
    </Suspense>
  )
}

export default SignInPage
