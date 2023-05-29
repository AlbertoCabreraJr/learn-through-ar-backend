import SwitchToMobileMessage from './components/SwitchToMobileMessage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ModulePage from './pages/ModulePage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import useIsDesktop from './hooks/useIsDesktop'
import ErrorPage from './pages/ErrorPage'
import TopicPage from './pages/TopicPage'
import ExamPage from './pages/ExamPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  const { isDesktop } = useIsDesktop()

  if (isDesktop) {
    return <SwitchToMobileMessage />
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/sign-in' element={<SignInPage />}></Route>
              <Route path='/error' element={<ErrorPage />}></Route>
              <Route path='/profile' element={<ProfilePage />}></Route>
              <Route path='*' element={<NotFoundPage />}></Route>
              <Route path='/course/:courseId' element={<HomePage />}></Route>
              <Route path='/course/:courseId/module/:moduleId' element={<ModulePage />}></Route>
              <Route path='/course/:courseId/module/:moduleId/topic/:topicId' element={<TopicPage />}></Route>
              <Route path='/course/:courseId/module/:moduleId/exam/:examId' element={<ExamPage />}></Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
