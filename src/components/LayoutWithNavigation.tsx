import React, { ReactNode } from 'react'
import BottomNavbar from './BottomNavbar'
import LogoWithText from './LogoWithText'

type LayoutWithNavigationProps = {
  children: ReactNode
}

const LayoutWithNavigation = ({ children }: LayoutWithNavigationProps) => {
  return (
    <div className='layout-with-navigation'>
      <div className='layout-with-navigation-header'>
        <LogoWithText />
      </div>
      <div className='content'>{children}</div>
      <BottomNavbar />
    </div>
  )
}

export default LayoutWithNavigation
