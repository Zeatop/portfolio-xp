import { useOsStore } from '../../store/useOsStore'
import styles from './LoginScreen.module.css'

const USERS = [
  {
    id: 'leo',
    name: 'Guest',
    avatar: 'bike-user.jpg',
  },
  {
    id: 'guest',
    name: 'Admin',
    sub: null,
    avatar: 'chess-user.webp',
  },
]

export default function LoginScreen() {
  const setPhase = useOsStore((s) => s.setPhase)

  return (
    <div className={styles.login}>
      {/* Top gradient bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner} />
      </div>

      {/* Main content */}
      <div className={styles.main}>
        {/* Left panel — logo + tagline */}
        <div className={styles.left}>
          {/* Radial glow behind logo */}
          <div className={styles.glow} />

          <div className={styles.leftContent}>
          <div className={styles.logoWrap}>
            <img
              src="/winxp_logo.svg"
              alt="Windows XP"
              className={styles.logoImg}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {/* Fallback inline logo if SVG missing */}
            <svg className={styles.logoSvg} viewBox="0 0 310 105" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="r1" cx="65%" cy="35%">
                  <stop offset="0%" stopColor="#ff9040" /><stop offset="100%" stopColor="#c03000" />
                </radialGradient>
                <radialGradient id="r2" cx="35%" cy="35%">
                  <stop offset="0%" stopColor="#60e860" /><stop offset="100%" stopColor="#108010" />
                </radialGradient>
                <radialGradient id="r3" cx="65%" cy="65%">
                  <stop offset="0%" stopColor="#60aaff" /><stop offset="100%" stopColor="#1040c0" />
                </radialGradient>
                <radialGradient id="r4" cx="35%" cy="65%">
                  <stop offset="0%" stopColor="#ffe870" /><stop offset="100%" stopColor="#c08000" />
                </radialGradient>
              </defs>
              {/* Flag — bigger, more prominent */}
              <path d="M4,6 Q26,1 46,8 Q42,28 37,48 Q16,44 4,34 Z" fill="url(#r1)" />
              <path d="M51,5 Q70,0 86,7 Q84,27 78,47 Q60,47 51,45 Q51,25 51,5Z" fill="url(#r2)" />
              <path d="M3,54 Q20,47 37,51 Q37,71 39,90 Q20,97 3,87 Z" fill="url(#r3)" />
              <path d="M51,51 Q68,47 84,54 Q87,74 81,92 Q64,100 51,93 Q51,72 51,51Z" fill="url(#r4)" />
              {/* Microsoft® */}
              <text x="100" y="30" fontFamily="Arial,sans-serif" fontSize="13" fill="rgba(255,255,255,0.85)" fontStyle="italic">Microsoft®</text>
              {/* Windows */}
              <text x="98" y="78" fontFamily="'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif" fontSize="52" fill="#ffffff" fontWeight="300" letterSpacing="1">Windows</text>
              {/* xp superscript */}
              <text x="272" y="58" fontFamily="Arial,sans-serif" fontSize="28" fill="#e8621a" fontStyle="italic" fontWeight="bold">xp</text>
              {/* TM */}
              <text x="268" y="80" fontFamily="Arial,sans-serif" fontSize="10" fill="rgba(255,255,255,0.55)">™</text>
            </svg>
          </div>

          <p className={styles.tagline}>To begin, click your user name</p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className={styles.divider} />

        {/* Right panel — user list */}
        <div className={styles.right}>
          {USERS.map((user) => (
            <button
              key={user.id}
              className={styles.user}
              onClick={() => setPhase('desktop')}
            >
              <img
                src={`/${user.avatar}`}
                alt={user.name}
                className={styles.avatar}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Emoji fallback */}
              <div className={styles.avatarFallback} style={{ display: 'none' }}>
                {user.id === 'leo' ? '🧑‍💻' : '👤'}
              </div>

              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                {user.sub && <span className={styles.userSub}>{user.sub}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <button className={styles.turnOff}>
          <span className={styles.turnOffIcon} />
          <span>Turn off computer</span>
        </button>
        <p className={styles.hint}>
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </p>
      </div>
    </div>
  )
}