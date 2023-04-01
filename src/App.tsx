import SwitchToMobileMessage from './components/SwitchToMobileMessage'
import { useIsDesktop } from './hooks/useIsDesktop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ModulePage from './pages/ModulePage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  const { isDesktop } = useIsDesktop()

  // if (isDesktop) {
  //   return <SwitchToMobileMessage />
  // }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/sign-in' element={<SignInPage />}></Route>
            <Route path='*' element={<NotFoundPage />}></Route>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/module/:id' element={<ModulePage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
