import React, { ReactNode } from 'react'
import BottomNavbar from './BottomNavbar'
import Header from './Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='layout'>
      <Header />
      <div className='content'>{children}</div>
      <BottomNavbar />
    </div>
  )
}

export default Layout
