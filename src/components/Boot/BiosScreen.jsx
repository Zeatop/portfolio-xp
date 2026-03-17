import { useEffect, useRef } from 'react'
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
  { text: 'BOOT OPTIONS:', delay: 100, cls: 'white' },
  { text: '  [*] Start Windows Normally', delay: 70, cls: 'green' },
  { text: '      Last Known Good Configuration', delay: 50 },
  { text: '      Safe Mode', delay: 50 },
  { text: '', delay: 80 },
  { text: 'Windows is loading files...', delay: 300 },
]

export default function BiosScreen() {
  const setPhase = useOsStore((s) => s.setPhase)
  const containerRef = useRef(null)

  useEffect(() => {
    let totalDelay = 0
    const timers = []

    BIOS_LINES.forEach((line, i) => {
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

    // Transition to splash after last line
    const endTimer = setTimeout(() => {
      setPhase('splash')
    }, totalDelay + 500)
    timers.push(endTimer)

    return () => timers.forEach(clearTimeout)
  }, [setPhase])

  return (
    <div className={styles.bios}>
      <div ref={containerRef} className={styles.content} />
    </div>
  )
}
