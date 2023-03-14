import logo from '../assets/logo.svg'

const LogoWithText = () => {
  return (
    <div className='logo-with-text'>
      <img src={logo} alt='Learn through AR logo' />
      <div className='text'>Learn through AR</div>
    </div>
  )
}

export default LogoWithText
