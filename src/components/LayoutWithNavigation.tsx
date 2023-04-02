import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import BottomNavbar from './BottomNavbar'
import LogoWithText from './LogoWithText'

type LayoutWithNavigationProps = {
  children: ReactNode
}

const LayoutWithNavigation = ({ children }: LayoutWithNavigationProps) => {
  const navigate = useNavigate()
  const { userToken } = useAuthContext()

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in')
    }
  }, [userToken, navigate])

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
