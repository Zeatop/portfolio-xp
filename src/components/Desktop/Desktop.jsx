import { useState, useEffect, useRef } from 'react'
import Webamp from 'webamp'
import { useOsStore } from '../../store/useOsStore'
import { DESKTOP_ICONS, START_MENU_LEFT, START_MENU_RIGHT, WINDOWS } from '../../data/windows'
import XpWindow from '../Window/XpWindow'
import styles from './Desktop.module.css'

const MUSIC_TRACKS = [
  { metaData: { artist: 'Fullart', title: "Spirit's march" },    url: "/music/Spirit's march.mp3" },
  { metaData: { artist: 'Fullart', title: 'Press play' },         url: '/music/Press play!.mp3' },
  { metaData: { artist: 'Fullart', title: 'Iron blindage' },      url: '/music/Iron blindage.mp3' },
  { metaData: { artist: 'Fullart', title: 'Underwater balad' },   url: '/music/Sonar swag.mp3' },
  { metaData: { artist: 'Fullart', title: 'Like winter' },        url: '/music/Like winter.mp3' },
]

export default function Desktop() {
  const windows     = useOsStore((s) => s.windows)
  const openWindow  = useOsStore((s) => s.openWindow)
  const toggleMinimize = useOsStore((s) => s.toggleMinimize)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [startOpen, setStartOpen]       = useState(false)
  const [clock, setClock]               = useState('')
  const webampRef   = useRef(null)
  const waNodeRef   = useRef(null)

  // Clock
  useEffect(() => {
    const tick = () => {
      const n  = new Date()
      const h  = String(n.getHours()).padStart(2, '0')
      const m  = String(n.getMinutes()).padStart(2, '0')
      const d  = String(n.getDate()).padStart(2, '0')
      const mo = String(n.getMonth() + 1).padStart(2, '0')
      const y  = String(n.getFullYear()).slice(2)
      setClock(`${h}:${m}\n${d}/${mo}/${y}`)
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  // Open About on load
  useEffect(() => {
    setTimeout(() => openWindow('about'), 300)
  }, [])

  // Nettoyage Webamp à la destruction du Desktop
  useEffect(() => {
    return () => {
      if (webampRef.current) {
        webampRef.current.dispose()
        webampRef.current = null
      }
    }
  }, [])

  function openMusique() {
    // Si déjà ouvert, ne rien faire
    if (webampRef.current) return

    // Créer un noeud conteneur invisible dans le body
    const node = document.createElement('div')
    document.body.appendChild(node)
    waNodeRef.current = node

    const wa = new Webamp({ initialTracks: MUSIC_TRACKS })
    wa.renderWhenReady(node)

    // Quand l'utilisateur ferme Webamp via son propre bouton X
    wa.onClose(() => {
      wa.dispose()
      webampRef.current = null
      if (waNodeRef.current) {
        document.body.removeChild(waNodeRef.current)
        waNodeRef.current = null
      }
    })

    webampRef.current = wa
  }

  // Handler d'ouverture : musique → Webamp, reste → XpWindow
  function handleOpen(id) {
    if (id === 'musique') {
      openMusique()
    } else {
      openWindow(id)
    }
    setStartOpen(false)
  }

  const openWindows = Object.keys(windows)

  return (
    <div className={styles.desktop} onClick={() => { setSelectedIcon(null); setStartOpen(false) }}>

      {/* Desktop icons */}
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          className={`${styles.icon} ${selectedIcon === icon.id ? styles.selected : ''}`}
          style={{ left: 12 + icon.col * 80, top: 10 + icon.row * 90 }}
          onClick={(e)       => { e.stopPropagation(); setSelectedIcon(icon.id) }}
          onDoubleClick={(e) => { e.stopPropagation(); handleOpen(icon.id) }}
        >
          {icon.img
            ? <img src={icon.img} alt={icon.label} className={styles.iconImg} />
            : <span className={styles.iconImg}>{icon.icon}</span>
          }
          <span className={styles.iconLabel}>{icon.label}</span>
        </div>
      ))}

      {/* Open windows (XpWindow only — musique gérée par Webamp) */}
      {openWindows.map((id) => (
        <XpWindow key={id} id={id} />
      ))}

      {/* Start menu */}
      {startOpen && (
        <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
          <div className={styles.smHeader}>
            <div className={styles.smAvatar}>🧑‍💻</div>
            <span className={styles.smName}>Léo</span>
          </div>
          <div className={styles.smBody}>
            <div className={styles.smLeft}>
              {START_MENU_LEFT.map((item) => (
                <button key={item.id} className={styles.smItem}
                  onClick={() => handleOpen(item.id)}>
                  {item.img
                    ? <img src={item.img} alt={item.label} className={styles.smItemIcon} style={{ width: 22, height: 22, objectFit: 'contain' }} />
                    : <span className={styles.smItemIcon}>{item.icon}</span>
                  }
                  {item.label}
                </button>
              ))}
              <div className={styles.smSep} />
            </div>
            <div className={styles.smRight}>
              {START_MENU_RIGHT.map((item) => (
                <button key={item.id} className={styles.smItem}
                  onClick={() => handleOpen(item.id)}>
                  {item.img
                    ? <img src={item.img} alt={item.label} className={styles.smItemIcon} style={{ width: 22, height: 22, objectFit: 'contain' }} />
                    : <span className={styles.smItemIcon}>{item.icon}</span>
                  }
                  {item.label}
                </button>
              ))}
              <div className={styles.smSep} />
              <button className={styles.smItem}>
                <span className={styles.smItemIcon}>🖥️</span>Panneau de config.
              </button>
            </div>
          </div>
          <div className={styles.smFooter}>
            <button className={styles.smFootBtn}>⏻ Arrêter</button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className={styles.taskbar} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${styles.startBtn} ${startOpen ? styles.startActive : ''}`}
          onClick={(e) => { e.stopPropagation(); setStartOpen((v) => !v) }}
        >
          <img src="/win_logo.svg" alt="Logo Windows" className={styles.flag} />
          démarrer
        </button>

        <div className={styles.tbTasks}>
          {openWindows.map((id) => {
            const meta = WINDOWS[id]
            if (!meta) return null
            return (
              <button
                key={id}
                className={`${styles.tbTask} ${!windows[id]?.minimized ? styles.tbActive : ''}`}
                onClick={() => toggleMinimize(id)}
              >
                {meta.img
                  ? <img src={meta.img} alt={meta.title} className={styles.tbIcon} />
                  : <span>{meta.icon}</span>
                }
                <span className={styles.tbLabel}>{meta.title}</span>
              </button>
            )
          })}
        </div>

        <div className={styles.tray}>
          <span className={styles.trayIcon}>🔊</span>
          <div className={styles.clock}>{clock.split('\n')[0]}<br />{clock.split('\n')[1]}</div>
        </div>
      </div>
    </div>
  )
}