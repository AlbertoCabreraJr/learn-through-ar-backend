import logo from '../assets/logo.svg'
import google from '../assets/google.svg'

const SignInPage = () => {
  return (
    <div className='signin-page'>
      <div className='logo-container'>
        <img className='image' src={logo} alt='Learn through AR logo' />
        <div className='text'>Learn through AR</div>
      </div>
      <button className='google-signin-button'>
        <img src={google} alt='Google logo' />
        <div className='text'>Sign-in with google</div>
      </button>
    </div>
  )
}

export default SignInPage
