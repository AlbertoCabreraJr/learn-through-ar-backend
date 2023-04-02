import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className='error-page'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>Oops, something went wrong!</div>
      <div className='go-back' onClick={() => navigate('/sign-in')}>
        Go back to Home
      </div>
    </div>
  )
}

export default ErrorPage
