import React from 'react'
import LayoutWithNavigation from '../../components/LayoutWithNavigation'
import signOutIcon from '../../assets/sign-out.svg'
import contactIcon from '../../assets/contact.svg'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Item = ({ icon, color, text, onClick }: { onClick: () => void; icon: string; color: string; text: string }) => {
  return (
    <div className='profile-page-item' onClick={onClick}>
      <img className='profile-page-item-icon' src={icon} alt={text} />
      <div className='profile-page-item-text' style={{ color }}>
        {text}
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const { signOut } = useAuthContext()
  const navigate = useNavigate()

  return (
    <LayoutWithNavigation>
      <div className='profile-page'>
        <Item
          color='#003075'
          icon={contactIcon}
          text='Contact Developer'
          onClick={() => {
            window.location.href = `mailto:aacabrera2@up.edu.ph`
          }}
        />
        <Item
          color='#FF3535'
          icon={signOutIcon}
          text='Log out'
          onClick={() => {
            signOut && signOut()
            navigate('/sign-in', { replace: true })
          }}
        />
      </div>
    </LayoutWithNavigation>
  )
}

export default ProfilePage
