import { useEffect, useRef } from 'react'

const Cursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailsRef = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Create trail dots
    const trailCount = 12
    const trails = []

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div')
      trail.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.4}px;
        height: ${8 - i * 0.4}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99990;
        opacity: ${1 - i * 0.08};
        background: ${i % 3 === 0
          ? '#C9973A'
          : i % 3 === 1
          ? '#FF85A1'
          : '#7EDBB0'};
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        filter: blur(${i * 0.3}px);
      `
      document.body.appendChild(trail)
      trails.push({ el: trail, x: 0, y: 0 })
    }
    trailsRef.current = trails

    // Main dot
    const dot = dotRef.current
    const ring = ringRef.current

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Move main dot instantly
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onMouseEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onMouseLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    // Hover effect on clickable elements
    const onMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        ring.style.width = '60px'
        ring.style.height = '60px'
        ring.style.borderColor = '#FF85A1'
        dot.style.background = '#FF85A1'
      } else {
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = 'rgba(201,151,58,0.6)'
        dot.style.background = '#C9973A'
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver)

    // Animate ring and trails with lag
    let animFrame
    const animate = () => {
      // Ring follows with smooth lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'

      // Each trail follows the previous one
      for (let i = trails.length - 1; i > 0; i--) {
        trails[i].x += (trails[i - 1].x - trails[i].x) * 0.35
        trails[i].y += (trails[i - 1].y - trails[i].y) * 0.35
        trails[i].el.style.left = trails[i].x + 'px'
        trails[i].el.style.top = trails[i].y + 'px'
      }

      // First trail follows mouse
      trails[0].x += (mousePos.current.x - trails[0].x) * 0.5
      trails[0].y += (mousePos.current.y - trails[0].y) * 0.5
      trails[0].el.style.left = trails[0].x + 'px'
      trails[0].el.style.top = trails[0].y + 'px'

      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(animFrame)
      trails.forEach(t => t.el.remove())
    }
  }, [])

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#C9973A',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.3s ease, width 0.3s ease, height 0.3s ease',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(201,151,58,0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
    </>
  )
}

export default Cursor