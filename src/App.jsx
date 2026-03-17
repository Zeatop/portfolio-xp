import { useOsStore } from './store/useOsStore'
import BiosScreen from './components/Boot/BiosScreen'
import SplashScreen from './components/Boot/SplashScreen'
import LoginScreen from './components/Login/LoginScreen'
import Desktop from './components/Desktop/Desktop'
import './App.css'

export default function App() {
  const phase = useOsStore((s) => s.phase)

  return (
    <div className="os-root">
      {phase === 'bios'    && <BiosScreen />}
      {phase === 'splash'  && <SplashScreen />}
      {phase === 'login'   && <LoginScreen />}
      {phase === 'desktop' && <Desktop />}
    </div>
  )
}
