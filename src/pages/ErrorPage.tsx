import logo from '../assets/logo.svg'

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>Oops, something went wrong!</div>
    </div>
  )
}

export default ErrorPage
