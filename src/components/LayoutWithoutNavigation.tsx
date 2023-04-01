import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../assets/back.svg'
import { useAuthContext } from '../context/AuthContext'
import LogoWithText from './LogoWithText'

type LayoutWithoutNavigationProps = {
  children: ReactNode
  onClickBack: () => void
}

const LayoutWithoutNavigation = ({ onClickBack, children }: LayoutWithoutNavigationProps) => {
  const navigate = useNavigate()
  const { userToken } = useAuthContext()

  if (!userToken) {
    navigate('/sign-in')
  }

  return (
    <div className='layout-without-navigation'>
      <div className='layout-without-navigation-header'>
        <img onClick={onClickBack} className='back-button' src={back} alt='Back icon' />
        <LogoWithText />
        <div />
      </div>
      <div className='content'>{children}</div>
    </div>
  )
}

export default LayoutWithoutNavigation
