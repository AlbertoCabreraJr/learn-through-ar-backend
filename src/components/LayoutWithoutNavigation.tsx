import { ReactNode } from 'react'
import back from '../assets/back.svg'
import LogoWithText from './LogoWithText'

type LayoutWithoutNavigationProps = {
  children: ReactNode
  onClickBack: () => void
}

const LayoutWithoutNavigation = ({ onClickBack, children }: LayoutWithoutNavigationProps) => {
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
