import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='header' onClick={() => navigate('/')}>
      <img src={logo} alt='Learn through AR logo' />
      <div className='text'>Learn through AR</div>
    </div>
  )
}

export default Header
