import { useEffect, useRef, useState } from 'react'
import { useOsStore } from '../../store/useOsStore'
import styles from './BiosScreen.module.css'

const BIOS_LINES = [
  { text: 'PhoenixBIOS 4 Release 6.0', delay: 0 },
  { text: 'Copyright 1985-2003 Phoenix Technologies Ltd.', delay: 80 },
  { text: 'All Rights Reserved', delay: 60 },
  { text: '', delay: 50 },
  { text: 'CPU : Intel Pentium 4  2.80GHz', delay: 120 },
  { text: 'Memory Test :   524288K OK', delay: 180, cls: 'green' },
  { text: '', delay: 50 },
  { text: 'IDE Channel 0 Master  : WDC WD800JB-00JJC0', delay: 130 },
  { text: 'IDE Channel 1 Master  : VMware Virtual IDE CDROM Drive', delay: 80 },
  { text: '', delay: 50 },
  { text: 'User     : léo', delay: 110, cls: 'cyan' },
  { text: 'System   : Windows XP Professional SP3', delay: 80, cls: 'cyan' },
  { text: 'IP       : 192.168.1.42', delay: 70 },
  { text: '', delay: 50 },
  { text: 'Verifying DMI Pool Data ........', delay: 240 },
  { text: '', delay: 50 },
  { text: 'Detected devices:', delay: 100, cls: 'white' },
  { text: '  [OK] USB Controller    — initialized', delay: 60, cls: 'green' },
  { text: '  [OK] Network Adapter   — 192.168.1.42', delay: 60, cls: 'green' },
  { text: '  [OK] Display Adapter   — NVIDIA GeForce FX 5200', delay: 60, cls: 'green' },
  { text: "  [OK] Audio Device      — AC'97 Audio Controller", delay: 60, cls: 'green' },
  { text: '', delay: 40 },
  { text: 'Press DEL to enter SETUP, F8 for Boot Menu', delay: 80, cls: 'white' },
  { text: '', delay: 60 },
]

const BOOT_LOG_NORMAL = [
  { text: 'Loading Windows XP Professional...', delay: 0,   cls: 'white' },
  { text: 'Initializing kernel...              [OK]', delay: 180, cls: 'green' },
  { text: 'Loading HAL...                      [OK]', delay: 150, cls: 'green' },
  { text: 'Starting device drivers...          [OK]', delay: 160, cls: 'green' },
  { text: 'Mounting file system...             [OK]', delay: 140, cls: 'green' },
  { text: 'Starting Win32 subsystem...         [OK]', delay: 170, cls: 'green' },
  { text: '', delay: 80 },
  { text: 'Windows XP Professional is starting...', delay: 100, cls: 'white' },
]

const BOOT_LOG_SAFE = [
  { text: 'Entering Safe Mode...', delay: 0,   cls: 'white' },
  { text: 'Loading minimal drivers...          [OK]', delay: 200, cls: 'green' },
  { text: 'Skipping non-essential services...  [OK]', delay: 180, cls: 'green' },
  { text: 'Mounting file system (read-only)... [OK]', delay: 160, cls: 'green' },
  { text: '', delay: 80 },
  { text: 'Redirecting to safe environment...', delay: 120, cls: 'cyan' },
]

const BOOT_OPTIONS = [
  { label: 'Lancer Windows normalement', action: 'normal' },
  { label: 'Mode sans erreurs',          action: 'safe'   },
]

const ASCII_LINES = [
  ' ███████╗███████╗ █████╗ ████████╗ ██████╗ ██████╗ ',
  ' ╚══███╔╝██╔════╝██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗',
  '   ███╔╝ █████╗  ███████║   ██║   ██║   ██║██████╔╝',
  '  ███╔╝  ██╔══╝  ██╔══██║   ██║   ██║   ██║██╔═══╝ ',
  ' ███████╗███████╗██║  ██║   ██║   ╚██████╔╝██║     ',
  ' ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ',
]

const GRADIENT_COLORS = [
  '#ff00c8', // neon pink
  '#ff0080', // hot pink
  '#ff0057', // magenta
  '#a800ff', // purple
  '#3f00ff', // deep blue
  '#00cfff', // cyan
  '#00ffd0', // turquoise
  '#00ff8a', // greenish neon
  '#00ff47', // lime
  '#ffe600', // yellow
  '#ffae00', // orange
  '#ff5e00', // orange-red
  '#ff0000', // red
  '#ff0057', // magenta (boucle)
  '#ff00c8', // neon pink (boucle)
]

export default function BiosScreen() {
  const setPhase = useOsStore((s) => s.setPhase)
  const containerRef = useRef(null)
  const logRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showAscii, setShowAscii] = useState(false)
  const [booting, setBooting] = useState(false)   // logs post-choix
  const [selected, setSelected] = useState(0)
  const selectedRef = useRef(0)
  const [asciiOffset, setAsciiOffset] = useState(0)

  useEffect(() => { selectedRef.current = selected }, [selected])

  useEffect(() => {
    const id = setInterval(() => {
      setAsciiOffset((o) => (o + 1) % GRADIENT_COLORS.length)
    }, 80)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let totalDelay = 0
    const timers = []

    BIOS_LINES.forEach((line) => {
      totalDelay += line.delay
      const t = setTimeout(() => {
        if (!containerRef.current) return
        const span = document.createElement('span')
        span.className = `${styles.line} ${line.cls ? styles[line.cls] : ''}`
        span.textContent = line.text || '\u00a0'
        containerRef.current.appendChild(span)
      }, totalDelay)
      timers.push(t)
    })

    const menuTimer = setTimeout(() => setShowMenu(true), totalDelay + 200)
    timers.push(menuTimer)

    const asciiTimer = setTimeout(() => setShowAscii(true), totalDelay + 600)
    timers.push(asciiTimer)

    return () => timers.forEach(clearTimeout)
  }, [])

  function runBootLogs(action) {
    setShowMenu(false)
    setBooting(true)
    const logs = action === 'safe' ? BOOT_LOG_SAFE : BOOT_LOG_NORMAL

    let delay = 100
    const timers = []

    logs.forEach((line) => {
      delay += line.delay
      const t = setTimeout(() => {
        if (!logRef.current) return
        const span = document.createElement('span')
        span.className = `${styles.line} ${line.cls ? styles[line.cls] : ''}`
        span.textContent = line.text || '\u00a0'
        logRef.current.appendChild(span)
      }, delay)
      timers.push(t)
    })

    // Transition après les logs
    const totalLog = delay + 600
    const endTimer = setTimeout(() => {
      if (action === 'safe') {
        window.location.href = import.meta.env.VITE_SAFEMODE_URL
      } else {
        setPhase('splash')
      }
    }, totalLog)
    timers.push(endTimer)
  }

  useEffect(() => {
    if (!showMenu) return
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') {
        setSelected((s) => (s - 1 + BOOT_OPTIONS.length) % BOOT_OPTIONS.length)
      } else if (e.key === 'ArrowDown') {
        setSelected((s) => (s + 1) % BOOT_OPTIONS.length)
      } else if (e.key === 'Enter') {
        runBootLogs(BOOT_OPTIONS[selectedRef.current].action)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [showMenu, setPhase])

  const n = ASCII_LINES.length

  return (
    <div className={styles.bios}>
      <div ref={containerRef} className={styles.content} />

      {showMenu && (
        <div className={styles.menu}>
          <span className={`${styles.line} ${styles.white}`}>BOOT OPTIONS:</span>
          <div className={styles.menuOptions}>
            {BOOT_OPTIONS.map((opt, i) => (
              <div
                key={opt.action}
                className={`${styles.menuItem} ${i === selected ? styles.menuItemActive : ''}`}
                onClick={() => {
                  setSelected(i)
                  runBootLogs(opt.action)
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
          <span className={`${styles.line} ${styles.hint}`}>
            Utilisez ↑↓ pour naviguer · Appuyez sur Entrée pour confirmer
          </span>
        </div>
      )}

      {/* Logs de boot post-choix */}
      {booting && (
        <div className={styles.bootLog}>
          <div ref={logRef} className={styles.content} />
        </div>
      )}

      {showAscii && (
        <div className={styles.ascii}>
          {ASCII_LINES.map((line, i) => {
            const invertedI = (n - 1 - i)
            const colorIdx = (invertedI + asciiOffset) % GRADIENT_COLORS.length
            return (
              <div
                key={i}
                className={styles.asciiLine}
                style={{ color: GRADIENT_COLORS[colorIdx] }}
              >
                {line}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}