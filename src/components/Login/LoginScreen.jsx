import { useOsStore } from '../../store/useOsStore'
import styles from './LoginScreen.module.css'

export default function LoginScreen() {
  const setPhase = useOsStore((s) => s.setPhase)

  return (
    <div className={styles.login}>
      {/* Top blue bar */}
      <div className={styles.topBar} />

      {/* Main area */}
      <div className={styles.main}>
        {/* Left: logo + tagline */}
        <div className={styles.left}>
          <img src="winxp_logo.svg" alt="Windows XP" className={styles.logo} />
          <p className={styles.tagline}>To begin, click your user name</p>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Right: user list */}
        <div className={styles.right}>
          <button className={styles.user} onClick={() => setPhase('desktop')}>
            <div className={styles.avatar}>🧑‍💻</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Léo</span>
              <span className={styles.userSub}>Concepteur Développeur</span>
            </div>
          </button>

          <button className={styles.user} onClick={() => setPhase('desktop')}>
            <div className={styles.avatar} style={{ background: '#2a6040' }}>👤</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Guest</span>
              <span className={styles.userSub}>Accès visiteur</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <button className={styles.turnOff}>
          <span className={styles.turnOffIcon} />
          Turn off computer
        </button>
        <p className={styles.hint}>
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </p>
      </div>
    </div>
  )
}
