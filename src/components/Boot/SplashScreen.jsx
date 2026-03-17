import { useEffect, useRef } from 'react'
import { useOsStore } from '../../store/useOsStore'
import styles from './SplashScreen.module.css'

export default function SplashScreen() {
  const setPhase = useOsStore((s) => s.setPhase)
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    // Animate the progress blocks on canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width  // 200
    const H = canvas.height // 18

    const BLOCK_W = 17
    const BLOCK_GAP = 1
    const STEP = BLOCK_W + BLOCK_GAP
    const N = 3
    let pos = -N * STEP
    let cycles = 0
    const MAX_CYCLES = 2

    function drawFrame() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < N; i++) {
        const x = pos + i * STEP
        if (x > -BLOCK_W && x < W) {
          // gradient per block
          const grad = ctx.createLinearGradient(x, 0, x, H)
          grad.addColorStop(0, '#88bbff')
          grad.addColorStop(0.5, '#2060cc')
          grad.addColorStop(1, '#1040aa')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.roundRect(x, 3, BLOCK_W, H - 6, 2)
          ctx.fill()
        }
      }
    }

    function animate() {
      pos += 2
      if (pos > W + STEP) {
        pos = -N * STEP
        cycles++
      }
      drawFrame()
      if (cycles < MAX_CYCLES) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => setPhase('login'), 50)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [setPhase])

  return (
    <div className={styles.splash}>
      <div className={styles.logoWrap}>
        <img src="/winxp_logo.svg" alt="Windows XP" className={styles.logo} />
      </div>

      {/* Progress bar */}
      <div className={styles.barWrap}>
        <div className={styles.barOuter}>
          <canvas ref={canvasRef} width={200} height={18} className={styles.canvas} />
        </div>
      </div>

      <div className={styles.copyLeft}>Copyright © Microsoft Corporation</div>
      <div className={styles.copyRight}>Microsoft</div>
    </div>
  )
}
