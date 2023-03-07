import SwitchToMobileMessage from './components/SwitchToMobileMessage'
import { useIsDesktop } from './hooks/useIsDesktop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const { isDesktop } = useIsDesktop()

  // if (isDesktop) {
  //   return <SwitchToMobileMessage />
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/sign-in' element={<SignInPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
