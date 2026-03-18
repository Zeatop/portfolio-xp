import { Rnd } from 'react-rnd'
import { useOsStore } from '../../store/useOsStore'
import { WINDOWS } from '../../data/windows'
import WindowContent from './WindowContent'
import styles from './XpWindow.module.css'

export default function XpWindow({ id }) {
  const win = useOsStore((s) => s.windows[id])
  const closeWindow = useOsStore((s) => s.closeWindow)
  const toggleMinimize = useOsStore((s) => s.toggleMinimize)
  const focusWindow = useOsStore((s) => s.focusWindow)
  const meta = WINDOWS[id]
  if (!meta || !win) return null
  if (win.minimized) return null

  return (
    <Rnd
      default={{
        x: 80 + Math.random() * 60,
        y: 40 + Math.random() * 40,
        width: meta.defaultSize.width,
        height: meta.defaultSize.height,
      }}
      minWidth={260}
      minHeight={160}
      bounds="parent"
      style={{ zIndex: win.zIndex, position: 'absolute' }}
      dragHandleClassName={styles.titleBar}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Wrapper interne qui remplit le conteneur Rnd */}
      <div className={styles.window}>
      {/* Title bar */}
      <div className={styles.titleBar}>
        <span className={styles.titleIcon}>{meta.icon}</span>
        <span className={styles.titleText}>{meta.title}</span>
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.min}`} onClick={() => toggleMinimize(id)}>_</button>
          <button className={`${styles.btn} ${styles.max}`}>□</button>
          <button className={`${styles.btn} ${styles.cls}`} onClick={() => closeWindow(id)}>✕</button>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <WindowContent id={id} />
      </div>
      </div>
    </Rnd>
  )
}