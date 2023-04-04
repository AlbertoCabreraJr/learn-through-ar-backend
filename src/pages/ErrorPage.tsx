import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuthContext } from '../context/AuthContext'

const ErrorPage = () => {
  const navigate = useNavigate()
  const { signOut } = useAuthContext()

  return (
    <div className='error-page'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>Oops, something went wrong!</div>
      <div
        className='go-back'
        onClick={async () => {
          signOut && signOut()
          navigate('/sign-in', { replace: true })
        }}
      >
        Go to Sign-in page
      </div>
    </div>
  )
}

export default ErrorPage
