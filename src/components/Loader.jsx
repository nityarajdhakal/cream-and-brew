import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  const stories = [
    {
      topic: 'Ice Cream',
      color: 'rgba(255,182,200,0.8)',
      text: 'Ice cream traces back to 7th century China, where Emperor Tang enjoyed frozen buffalo milk delicacies. By the 17th century, it graced the tables of European royalty — a luxury so rare, recipes were kept secret. Today, we honour that legacy in every scoop we craft.',
    },
    {
      topic: 'Coffee',
      color: 'rgba(201,151,58,0.8)',
      text: 'Legend tells of an Ethiopian goat herder named Kaldi, who noticed his goats dancing after eating berries from a certain tree. That discovery, around 850 AD, gave the world coffee. From Yemeni Sufi monks to Himalayan highlands — every cup carries centuries of story.',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + 1
      })
    }, 40)

    // Switch story at halfway
    const storyTimer = setTimeout(() => {
      setTextIndex(1)
    }, 2400)

    const timer = setTimeout(() => {
      setDone(true)
      setTimeout(() => setLoading(false), 1200)
    }, 4800)

    return () => {
      clearInterval(interval)
      clearTimeout(storyTimer)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, #1a0800 0%, #0d0507 40%, #050210 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >

          {/* Subtle glow only — no particles */}
          <motion.div
            style={{
              position: 'absolute',
              width: 500, height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,151,58,0.08), transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 350, height: 350,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,133,161,0.05), transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ===== MAIN CONTENT ===== */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.8rem',
            padding: '0 2rem',
            maxWidth: '640px',
            width: '100%',
          }}>

            {/* LOGO */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>

              {/* 🍦 CREAM */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.span
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  🍦
                </motion.span>
                <motion.span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                  initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                >
                  Cream
                </motion.span>
              </div>

              {/* & */}
              <motion.span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                  fontWeight: 900,
                  color: '#C9973A',
                  lineHeight: 1,
                  paddingBottom: '0.1rem',
                }}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.9, duration: 0.8, type: 'spring', stiffness: 200 }}
              >
                &
              </motion.span>

              {/* ☕ BREW */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.span
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  ☕
                </motion.span>
                <motion.span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                  initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                >
                  Brew
                </motion.span>
              </div>
            </div>

            {/* Gold line */}
            <motion.div
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #C9973A, #E8B85A, #C9973A, transparent)',
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
            />

            {/* Tagline */}
            <motion.p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Where every bite and sip becomes a memory
            </motion.p>

            {/* ===== STORY PARAGRAPH ===== */}
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                {/* Topic label */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: stories[textIndex].color,
                }}>
                  — Did you know · {stories[textIndex].topic} —
                </p>

                {/* Story text */}
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.38)',
                  maxWidth: '520px',
                  textAlign: 'center',
                }}>
                  {stories[textIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <motion.div
              style={{
                width: '100%',
                height: '1px',
                borderRadius: '100px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div style={{
                height: '100%',
                borderRadius: '100px',
                background: 'linear-gradient(90deg, #FF85A1, #C9973A, #7EDBB0)',
                width: `${progress}%`,
                transition: 'width 0.1s linear',
              }} />
            </motion.div>

            {/* Kathmandu + percentage */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <motion.p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.18)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Kathmandu, Nepal
              </motion.p>

              <motion.p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(201,151,58,0.6)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {progress}%
              </motion.p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader