import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMatchMedia } from '../hooks/useMatchMedia'

const Home = () => {
  const navigate = useNavigate()
  const isNarrow = useMatchMedia('(max-width: 768px)')

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '100%',
      minHeight: '100vh',
      height: isNarrow ? 'auto' : '100vh',
      overflow: isNarrow ? 'auto' : 'hidden',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: isNarrow ? 'column' : 'row',
    }}>

      {/* ===== LEFT — ICE CREAM WORLD ===== */}
      <div style={{
        position: 'relative',
        flex: 1,
        minHeight: isNarrow ? 'min(52vh, 420px)' : '100%',
        height: isNarrow ? 'min(52vh, 420px)' : '100%',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #FFF0F5 0%, #FFE4EE 50%, #FFD6E6 100%)',
      }}>

        {/* Blobs */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,182,200,0.5), transparent 70%)',
          top: '-100px', left: '-100px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 250, height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(152,224,192,0.3), transparent 70%)',
          bottom: '10%', right: '5%', pointerEvents: 'none',
        }} />

        {/* Ice cream — perfectly centered in left half */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'drop-shadow(0 20px 40px rgba(255,133,161,0.4))',
            pointerEvents: 'none',
          }}
        >
          🍦
        </motion.div>

        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: '15%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.8rem',
          padding: '0 2rem',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#FF85A1',
            textAlign: 'center',
          }}>
            Artisan · Colourful · Playful
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)',
            fontWeight: 900, color: '#2C1A0E',
            lineHeight: 1.2, textAlign: 'center',
          }}>
            Where every scoop tells<br />
            <em style={{ color: '#FF85A1' }}>a delicious story</em>
          </h2>
          <motion.button
            onClick={() => navigate('/icecream')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #FF85A1, #FFB6C8)',
              color: 'white', border: 'none',
              padding: '0.8rem 1.8rem', borderRadius: '100px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem', fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(255,133,161,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            Enter Ice Cream World →
          </motion.button>
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div style={{
        width: isNarrow ? '100%' : '1px',
        height: isNarrow ? '1px' : 'auto',
        flexShrink: 0,
        zIndex: 10,
        background: isNarrow
          ? 'linear-gradient(to right, transparent, rgba(201,151,58,0.45), transparent)'
          : 'linear-gradient(to bottom, transparent, rgba(201,151,58,0.5), transparent)',
      }} />

      {/* ===== RIGHT — COFFEE WORLD ===== */}
      <div style={{
        position: 'relative',
        flex: 1,
        minHeight: isNarrow ? 'min(52vh, 420px)' : '100%',
        height: isNarrow ? 'min(52vh, 420px)' : '100%',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #4A2810 0%, #2C1A0E 50%, #1A0F07 100%)',
      }}>

        {/* Warm blobs */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,151,58,0.25), transparent 70%)',
          top: '-80px', right: '-80px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,151,58,0.15), transparent 70%)',
          bottom: '10%', left: '0%', pointerEvents: 'none',
        }} />

        {/* Coffee — perfectly centered in right half */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            position: 'absolute',
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'drop-shadow(0 20px 40px rgba(201,151,58,0.4))',
            pointerEvents: 'none',
          }}
        >
          ☕
        </motion.div>

        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: '15%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.8rem',
          padding: '0 2rem',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C9973A',
            textAlign: 'center',
          }}>
            Himalayan · Exotic · Warm
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)',
            fontWeight: 900, color: 'white',
            lineHeight: 1.2, textAlign: 'center',
          }}>
            Brewed from the soul<br />
            <em style={{ color: '#C9973A' }}>of the Himalayas</em>
          </h2>
          <motion.button
            onClick={() => navigate('/coffee')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #C9973A, #E8B85A)',
              color: 'white', border: 'none',
              padding: '0.8rem 1.8rem', borderRadius: '100px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem', fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(201,151,58,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            Enter Coffee World →
          </motion.button>
        </div>
      </div>

      {/* ===== CENTER LOGO ===== */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        textAlign: 'center',
        pointerEvents: 'none',
        width: 'max-content',
        maxWidth: isNarrow ? 'min(92vw, 340px)' : undefined,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, type: 'spring' }}
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '100px',
            padding: '1rem 2.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.25rem, 4.5vw, 2.8rem)',
            fontWeight: 900, color: 'white',
            whiteSpace: isNarrow ? 'normal' : 'nowrap',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            lineHeight: 1.2,
          }}>
            Cream <span style={{ color: '#E8B85A' }}>&</span> Brew
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.62rem', letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '0.3rem', whiteSpace: 'nowrap',
          }}>
            Kathmandu · Nepal
          </p>
        </motion.div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '1rem', whiteSpace: 'nowrap',
          }}
        >
          ← Click to explore →
        </motion.p>
      </div>

    </div>
  )
}

export default Home