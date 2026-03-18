import { Rnd } from 'react-rnd'
import { useOsStore } from '../../store/useOsStore'
import { WINDOWS } from '../../data/windows'
import WindowContent from './WindowContent'
import styles from './XpWindow.module.css'
import { useRef, useEffect, useState } from 'react'

const TITLEBAR_H = 28

export default function XpWindow({ id }) {
  const win = useOsStore((s) => s.windows[id])
  const closeWindow = useOsStore((s) => s.closeWindow)
  const toggleMinimize = useOsStore((s) => s.toggleMinimize)
  const focusWindow = useOsStore((s) => s.focusWindow)
  const meta = WINDOWS[id]
  const rndRef = useRef(null)
  const [dynSize, setDynSize] = useState(null)
  const [ready, setReady] = useState(id !== 'minesweeper') // autres fenêtres toujours visibles

  useEffect(() => {
    if (id !== 'minesweeper') return
    const handler = (e) => {
      if (e.data?.type !== 'minesweeper-resize') return
      const newW = e.data.width
      const newH = e.data.height + TITLEBAR_H
      setDynSize({ width: newW, height: newH })
      rndRef.current?.updateSize({ width: newW, height: newH })
      setReady(true) // afficher seulement quand la taille est connue
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [id])

  if (!meta || !win) return null
  if (win.minimized) return null

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: 80 + Math.random() * 60,
        y: 40 + Math.random() * 40,
        width: meta.defaultSize.width,
        height: meta.defaultSize.height,
      }}
      {...(id === 'minesweeper' && dynSize ? { size: dynSize } : {})}
      minWidth={id === 'minesweeper' ? undefined : 260}
      minHeight={id === 'minesweeper' ? undefined : 160}
      disableResizing={id === 'minesweeper'}
      bounds="parent"
      style={{
        zIndex: win.zIndex,
        position: 'absolute',
        visibility: ready ? 'visible' : 'hidden',  // invisible tant que taille inconnue
      }}
      dragHandleClassName={styles.titleBar}
      onMouseDown={() => focusWindow(id)}
    >
      <div className={styles.window}>
        <div className={styles.titleBar}>
          {meta.img
            ? <img src={meta.img} alt={meta.title} className={styles.titleIcon} />
            : <span className={styles.titleIcon}>{meta.icon}</span>
          }
          <span className={styles.titleText}>{meta.title}</span>
          <div className={styles.buttons}>
            <button className={`${styles.btn} ${styles.min}`} onClick={() => toggleMinimize(id)}>_</button>
            <button className={`${styles.btn} ${styles.max}`}>□</button>
            <button className={`${styles.btn} ${styles.cls}`} onClick={() => closeWindow(id)}>✕</button>
          </div>
        </div>
        <div className={styles.body} style={
          id === 'minesweeper' || id === 'pinball' 
          ? { padding: 0, overflow: 'hidden' } 
          : {}
          }
          onMouseDown={id === 'pinball' ? (e) => e.stopPropagation() : undefined}
          >
          <WindowContent id={id} />
        </div>
      </div>
    </Rnd>
  )
}