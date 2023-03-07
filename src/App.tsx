import SwitchToMobileMessage from './components/SwitchToMobileMessage'
import { useIsDesktop } from './hooks/useIsDesktop'

const App = () => {
  const { isDesktop } = useIsDesktop()

  if (isDesktop) {
    return <SwitchToMobileMessage />
  }

  return <div>hehe</div>
}

export default App
