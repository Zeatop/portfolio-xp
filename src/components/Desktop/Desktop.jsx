import { useState, useEffect } from 'react'
import { useOsStore } from '../../store/useOsStore'
import { DESKTOP_ICONS, START_MENU_LEFT, START_MENU_RIGHT, WINDOWS } from '../../data/windows'
import XpWindow from '../Window/XpWindow'
import styles from './Desktop.module.css'

export default function Desktop() {
  const windows = useOsStore((s) => s.windows)
  const openWindow = useOsStore((s) => s.openWindow)
  const toggleMinimize = useOsStore((s) => s.toggleMinimize)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [clock, setClock] = useState('')

  // Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const h = String(n.getHours()).padStart(2, '0')
      const m = String(n.getMinutes()).padStart(2, '0')
      const d = String(n.getDate()).padStart(2, '0')
      const mo = String(n.getMonth() + 1).padStart(2, '0')
      const y = String(n.getFullYear()).slice(2)
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

  const openWindows = Object.keys(windows)

  return (
    <div className={styles.desktop} onClick={() => { setSelectedIcon(null); setStartOpen(false) }}>
      {/* Desktop icons */}
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          className={`${styles.icon} ${selectedIcon === icon.id ? styles.selected : ''}`}
          style={{ left: 12 + icon.col * 80, top: 10 + icon.row * 90 }}
          onClick={(e) => { e.stopPropagation(); setSelectedIcon(icon.id) }}
          onDoubleClick={(e) => { e.stopPropagation(); openWindow(icon.id) }}
        >
          {icon.img 
          ? <img src={icon.img} alt={icon.label} className={styles.iconImg} />
          : <span className={styles.iconImg}>{icon.icon}</span>
          }
          <span className={styles.iconLabel}>{icon.label}</span>
        </div>
      ))}

      {/* Open windows */}
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
                  onClick={() => { openWindow(item.id); setStartOpen(false) }}>
                  <span className={styles.smItemIcon}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div className={styles.smSep} />
            </div>
            <div className={styles.smRight}>
              {START_MENU_RIGHT.map((item) => (
                <button key={item.id} className={styles.smItem}
                  onClick={() => { openWindow(item.id); setStartOpen(false) }}>
                  <span className={styles.smItemIcon}>{item.icon}</span>
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
