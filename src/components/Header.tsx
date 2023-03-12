import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} alt='Learn through AR logo' />
      <div className='text'>Learn through AR</div>
    </div>
  )
}

export default Header
