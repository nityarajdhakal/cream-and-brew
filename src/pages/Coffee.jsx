import axios from 'axios'
import API_BASE_URL from '../config'
import FeedbackSection from '../components/Feedback'
import Footer from '../components/Footer'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMatchMedia } from '../hooks/useMatchMedia'

const MotionLink = motion(Link)

const Coffee = () => {
  const isNarrow = useMatchMedia('(max-width: 768px)')
  const mountainRef = useRef(null)
  const cupRef = useRef(null)
  const [inViewMenu, setInViewMenu] = useState(false)
  const menuRef = useRef(null)
  const [dbMenuItems, setDbMenuItems] = useState([])
  const [dbLoading, setDbLoading] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return
      const x = (e.clientX / window.innerWidth - 0.5)
      const y = (e.clientY / window.innerHeight - 0.5)
      if (mountainRef.current) {
        mountainRef.current.style.transform = `translate(${x * 30}px, ${y * 15}px)`
      }
      if (cupRef.current) {
        cupRef.current.style.transform = `translate(${x * -20}px, ${y * -10}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInViewMenu(true) },
      { threshold: 0.1 }
    )
    if (menuRef.current) observer.observe(menuRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/menu/coffee`)
        setDbMenuItems(res.data)
      } catch (err) {
        console.error(err)
      }
      setDbLoading(false)
    }
    fetchMenu()
  }, [])

  const menuItems = [
    {
      name: 'Himalayan Brew',
      tag: 'House Specialty',
      desc: 'Single-origin Nepali beans, slow poured and served with mountain spring water on the side. The taste of altitude.',
      flavours: ['Light Roast', 'Medium Roast', 'Dark Roast'],
      emoji: '⛰️',
      color: '#C9973A',
      bg: 'linear-gradient(135deg, #1A0F07, #2C1A0E)',
      light: false,
    },
    {
      name: 'Exotic coffee',
      tag: 'Teas',
      desc: 'Masala chai, tulsi green, and Ilam first flush — Nepal\'s finest leaves steeped to perfection in clay pots.',
      flavours: ['Masala Chai', 'Tulsi Green', 'Ilam First Flush'],
      emoji: '🍵',
      color: '#7EDBB0',
      bg: 'linear-gradient(135deg, #0A1F15, #0D2A1C)',
      light: false,
    },
    {
      name: 'Espresso Bar',
      tag: 'Espresso',
      desc: 'Classically pulled shots, cortados, flat whites, and our famous altitude latte with cardamom foam.',
      flavours: ['Cortado', 'Flat White', 'Altitude Latte'],
      emoji: '☕',
      color: '#E8B85A',
      bg: 'linear-gradient(135deg, #C9973A, #8B6914)',
      light: true,
    },
    {
      name: 'Cold Brews',
      tag: 'Cold',
      desc: '18-hour cold steep, served over hand-chipped ice. Smooth, bold, and dangerously refreshing.',
      flavours: ['Classic Cold', 'Vanilla Nitro', 'Spiced Cold'],
      emoji: '🧊',
      color: '#C8E6F5',
      bg: 'linear-gradient(135deg, #0A1520, #0D1F2D)',
      light: false,
    },
  ]

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      minHeight: '100vh',
      background: '#0a0501',
      overflowX: 'hidden',
    }}>

      {/* ===== HERO ===== */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: isNarrow ? 'min(100vh, 900px)' : '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: isNarrow ? 'flex-start' : 'center',
        justifyContent: isNarrow ? 'flex-start' : 'center',
        paddingBottom: isNarrow ? 'clamp(7rem, 20vw, 11rem)' : 0,
      }}>

        {/* Dark sky background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #1A0F07 0%, #2C1A0E 25%, #3D4A2E 55%, #2A3820 70%, #1A2510 85%, #0a0501 100%)',
        }} />

        {/* Gold glow */}
        <motion.div
          style={{
            position: 'absolute',
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,151,58,0.12), transparent 70%)',
            top: '-100px', right: '-100px',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mountains */}
        <div
          ref={mountainRef}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 1440 600"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              bottom: '20%',
              width: '120%',
              left: '-10%',
            }}
            preserveAspectRatio="none"
          >
            <polygon
              points="0,600 200,200 350,350 500,150 650,300 800,100 950,280 1100,180 1250,320 1440,200 1440,600"
              fill="rgba(40,55,35,0.9)"
            />
            <polygon points="500,150 472,225 528,225" fill="rgba(255,240,200,0.9)" />
            <polygon points="800,100 770,188 830,188" fill="rgba(255,245,210,0.95)" />
            <polygon points="1100,180 1074,258 1126,258" fill="rgba(255,240,200,0.85)" />
            <polygon points="200,200 180,262 220,262" fill="rgba(255,235,195,0.8)" />
            <polygon
              points="0,600 150,350 300,450 500,280 700,400 900,260 1100,380 1300,300 1440,380 1440,600"
              fill="rgba(25,35,20,0.95)"
            />
            <polygon
              points="0,600 200,480 400,520 600,460 800,510 1000,450 1200,490 1440,460 1440,600"
              fill="rgba(15,20,10,0.98)"
            />
          </svg>
        </div>

        {/* Giant Coffee Cup */}
        <motion.div
          ref={cupRef}
          style={{
            position: 'absolute',
            right: isNarrow ? '50%' : '8%',
            bottom: isNarrow ? '4%' : '8%',
            zIndex: 4,
            transition: 'transform 0.15s ease-out',
          }}
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div style={{ transform: isNarrow ? 'translateX(50%)' : undefined }}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              transform: isNarrow ? 'scale(0.78)' : undefined,
              transformOrigin: 'bottom center',
            }}
          >
            <svg
              width="300"
              height="320"
              viewBox="0 0 300 320"
              xmlns="http://www.w3.org/2000/svg"
              style={{ maxWidth: isNarrow ? 'min(260px, 72vw)' : undefined }}
            >
              <defs>
                <linearGradient id="cupBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5C3317" />
                  <stop offset="100%" stopColor="#2C1A0E" />
                </linearGradient>
                <radialGradient id="coffeeTop" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#8B6347" />
                  <stop offset="60%" stopColor="#5C3317" />
                  <stop offset="100%" stopColor="#3B1F0A" />
                </radialGradient>
                <linearGradient id="saucer" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8C99A" />
                  <stop offset="100%" stopColor="#C9973A" />
                </linearGradient>
                <radialGradient id="latteArt" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,220,160,0.6)" />
                  <stop offset="100%" stopColor="rgba(200,140,60,0.2)" />
                </radialGradient>
              </defs>
              <ellipse cx="150" cy="285" rx="110" ry="26" fill="url(#saucer)" />
              <ellipse cx="150" cy="280" rx="85" ry="16" fill="rgba(255,255,255,0.12)" />
              <path d="M 60 140 L 75 275 Q 150 295 225 275 L 240 140 Z" fill="url(#cupBody)" />
              <path d="M 65 145 L 78 268 Q 100 282 110 268 L 98 145 Z" fill="rgba(255,255,255,0.06)" />
              <path d="M 240 170 Q 295 170 295 210 Q 295 250 240 250"
                stroke="#C9973A" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M 240 170 Q 282 170 282 210 Q 282 250 240 250"
                stroke="#5C3317" strokeWidth="9" fill="none" strokeLinecap="round" />
              <ellipse cx="150" cy="143" rx="80" ry="20" fill="url(#coffeeTop)" />
              <ellipse cx="150" cy="143" rx="80" ry="20" fill="url(#latteArt)" />
              <path
                d="M 150 158 C 150 158 128 148 128 136 C 128 129 136 125 150 133 C 164 125 172 129 172 136 C 172 148 150 158 150 158 Z"
                fill="rgba(255,210,140,0.45)"
              />
              <ellipse cx="150" cy="140" rx="80" ry="20" fill="none"
                stroke="rgba(201,151,58,0.3)" strokeWidth="2" />
              {[0, 1, 2].map((i) => (
                <motion.path
                  key={i}
                  d={`M ${110 + i * 30} 135 Q ${105 + i * 30} 108 ${112 + i * 30} 88 Q ${119 + i * 30} 65 ${115 + i * 30} 45`}
                  stroke="rgba(201,151,58,0.45)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </svg>
          </motion.div>
          </div>
        </motion.div>

        {/* Hero Text */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: isNarrow ? '100%' : '600px',
          width: '100%',
          boxSizing: 'border-box',
          padding: isNarrow ? '5.25rem 1.25rem 0' : '0 3rem',
          marginRight: isNarrow ? 0 : '20%',
          textAlign: isNarrow ? 'center' : 'left',
        }}>
          <motion.p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: isNarrow ? '0.2em' : '0.3em',
              textTransform: 'uppercase',
              color: '#C9973A',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              justifyContent: isNarrow ? 'center' : 'flex-start',
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: '#C9973A' }} />
            Cream & Brew · Coffee
          </motion.p>

          <motion.h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 9vw, 5.5rem)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            Coffee,<br />
            <em style={{ color: '#C9973A', fontStyle: 'italic' }}>Elevated</em>
          </motion.h1>

          <motion.p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 3.5vw, 1rem)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '2.5rem',
              maxWidth: '420px',
              marginLeft: isNarrow ? 'auto' : undefined,
              marginRight: isNarrow ? 'auto' : undefined,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
          >
            Brewed from the soul of the Himalayas. Every cup carries the altitude, the mist, and centuries of mountain tradition.
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: isNarrow ? 'center' : 'flex-start',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #C9973A, #E8B85A)',
                color: 'white',
                padding: '0.9rem 2rem',
                borderRadius: '100px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(201,151,58,0.35)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Explore Menu
            </motion.a>
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                padding: '0.9rem 2rem',
                borderRadius: '100px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Our Experience
            </motion.a>
          </motion.div>
        </div>

        {/* Book a Table */}
        <MotionLink
          to="/reservation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            position: 'absolute',
            top: isNarrow ? '1rem' : '1.5rem',
            right: isNarrow ? '0.75rem' : '2rem',
            zIndex: 10,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,151,58,0.4)',
            borderRadius: '100px',
            padding: isNarrow ? '0.55rem 1.1rem' : '0.65rem 1.4rem',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isNarrow ? '0.72rem' : '0.78rem',
            fontWeight: 500,
            color: 'white',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#C9973A',
            display: 'inline-block',
          }} />
          Book a Table
        </MotionLink>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}>Scroll</p>
          <motion.div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(201,151,58,0.6), transparent)',
            }}
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* ===== MENU SECTION ===== */}
      <div
        id="menu"
        ref={menuRef}
        style={{
          padding: '8rem 4rem',
          background: 'linear-gradient(180deg, #0a0501 0%, #150A04 100%)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '5rem' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inViewMenu ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9973A',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
              What We Brew
              <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
            }}>
              The Coffee <em style={{ color: '#C9973A', fontStyle: 'italic' }}>Menu</em>
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.35)',
              marginTop: '1rem',
              maxWidth: '500px',
              margin: '1rem auto 0',
            }}>
              Every cup is a journey. Every sip, a story from the mountains.
            </p>
          </motion.div>

          {/* Menu Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}>
            {dbLoading ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
              }}>
                Loading menu...
              </div>
            ) : dbMenuItems.length > 0 ? (
              dbMenuItems.map((item, i) => (
                <CoffeeCard
                  key={item._id}
                  item={{
                    name: item.name,
                    tag: item.tag || 'Special',
                    desc: item.description,
                    flavours: [],
                    emoji: item.emoji || '☕',
                    color: '#C9973A',
                    bg: 'linear-gradient(135deg, #1A0F07, #2C1A0E)',
                    light: false,
                    price: item.price,
                  }}
                  index={i}
                  inView={inViewMenu}
                />
              ))
            ) : (
              menuItems.map((item, i) => (
                <CoffeeCard key={i} item={item} index={i} inView={inViewMenu} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ===== EXPERIENCE SECTION ===== */}
      <div
        id="experience"
        style={{
          padding: '8rem 4rem',
          background: 'linear-gradient(180deg, #150A04 0%, #0a0501 100%)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9973A',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
              Why We Are Different
              <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
            }}>
              Not Just Coffee —<br />
              <em style={{ color: '#C9973A', fontStyle: 'italic' }}>A Journey</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}>
            {[
              {
                num: '01',
                title: 'Himalayan Origins',
                desc: 'Our beans are sourced directly from Nepali highland farmers — single origin, traceable, and roasted fresh every week.',
                emoji: '⛰️',
              },
              {
                num: '02',
                title: 'The Art of Brewing',
                desc: 'Every brewing method is chosen to honour the bean — pour over, espresso, cold steep, or clay pot. Never rushed.',
                emoji: '🎯',
              },
              {
                num: '03',
                title: 'Latte Art Masters',
                desc: 'Our baristas train for months to perfect the pour. Every cup comes with art on top and heart behind it.',
                emoji: '🎨',
              },
              {
                num: '04',
                title: 'The Right Atmosphere',
                desc: 'Dark, warm, and intimate. The kind of place where conversations last longer and time slows down.',
                emoji: '🕯️',
              },
            ].map((card, i) => (
              <CoffeeExperienceCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== POLAROID GALLERY ===== */}
      <div style={{
        padding: '8rem 4rem',
        background: '#0a0501',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9973A',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
              The Vibe
              <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              color: 'white',
            }}>
              Feel The <em style={{ color: '#C9973A', fontStyle: 'italic' }}>Warmth.</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
            alignItems: 'start',
          }}>
            {[
              { label: 'Himalayan Brew', bg: 'linear-gradient(135deg, #3D2010, #7B4A25)', rotate: -3, emoji: '⛰️', top: 0, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop' },
              { label: 'Latte Art', bg: 'linear-gradient(135deg, #5C3317, #C9973A)', rotate: 2, emoji: '☕', top: 40, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80&auto=format&fit=crop' },
              { label: 'The Lounge', bg: 'linear-gradient(135deg, #1A0F07, #3D2010)', rotate: -2, emoji: '🕯️', top: 0, image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80&auto=format&fit=crop' },
              { label: 'Cold Brew', bg: 'linear-gradient(135deg, #0A1520, #1E3A5A)', rotate: 3, emoji: '🧊', top: 20, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop' },
              { label: 'Exotic Coffee', bg: 'linear-gradient(135deg, #0A1F15, #1A4030)', rotate: -1, emoji: '🍵', top: 60, image: 'https://plus.unsplash.com/premium_photo-1726072371400-996a95bd8e08?q=80&w=600&auto=format&fit=crop' },
              { label: 'The Ritual', bg: 'linear-gradient(135deg, #2C1A0E, #6B3A20)', rotate: 2, emoji: '🎯', top: 10, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80&auto=format&fit=crop' },
            ].map((photo, i) => (
              <CoffeePolaroid key={i} photo={photo} index={i} />
            ))}
          </div>
        </div>
      </div>

      <FeedbackSection theme="dark" />
      <Footer theme="dark" />

    </div>
  )
}

// ===== COFFEE MENU CARD =====
const CoffeeCard = ({ item, index, inView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: item.bg,
        borderRadius: '28px',
        padding: '2.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${item.color}20`,
        boxShadow: hovered
          ? `0 30px 60px rgba(0,0,0,0.4), 0 0 40px ${item.color}15`
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {hovered && (
        <motion.div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.5rem',
            display: 'flex',
            gap: '6px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: '2px',
                height: '20px',
                background: `linear-gradient(to top, ${item.color}80, transparent)`,
                borderRadius: '10px',
              }}
              animate={{ y: [0, -15, 0], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>
      )}

      <div style={{
        display: 'inline-block',
        padding: '0.3rem 0.9rem',
        borderRadius: '100px',
        background: `${item.color}25`,
        color: item.color,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.62rem',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        border: `1px solid ${item.color}30`,
      }}>
        {item.tag}
      </div>

      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
        transition: 'transform 0.3s ease',
        display: 'inline-block',
      }}>
        {item.emoji}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.5rem',
        fontWeight: 700,
        color: item.light ? '#2C1A0E' : 'white',
        marginBottom: '0.75rem',
        display: 'block',
      }}>
        {item.name}
      </h3>

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: '0.88rem',
        lineHeight: 1.75,
        color: item.light ? 'rgba(44,26,14,0.7)' : 'rgba(255,255,255,0.5)',
        marginBottom: '1.5rem',
      }}>
        {item.desc}
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: item.price ? '1rem' : '0',
      }}>
        {item.flavours && item.flavours.map((f, j) => (
          <span key={j} style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '100px',
            border: `1px solid ${item.color}40`,
            color: item.color,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem',
          }}>
            {f}
          </span>
        ))}
      </div>

      {item.price && (
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          color: item.color,
          marginTop: '0.5rem',
        }}>
          {item.price}
        </p>
      )}

      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '80px',
            background: `linear-gradient(to top, ${item.color}20, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  )
}

// ===== COFFEE EXPERIENCE CARD =====
const CoffeeExperienceCard = ({ card, index }) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,151,58,0.12)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(201,151,58,0.08)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '5rem',
        fontWeight: 900,
        color: 'rgba(201,151,58,0.06)',
        lineHeight: 1,
        display: 'block',
        marginBottom: '-1rem',
      }}>
        {card.num}
      </span>
      <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>
        {card.emoji}
      </span>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'white',
        marginBottom: '0.75rem',
      }}>
        {card.title}
      </h3>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: '0.88rem',
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.35)',
      }}>
        {card.desc}
      </p>
      <div style={{
        position: 'absolute',
        left: 0, top: '20%', bottom: '20%',
        width: '3px',
        background: 'linear-gradient(to bottom, #C9973A, #E8B85A)',
        borderRadius: '10px',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />
    </motion.div>
  )
}

// ===== COFFEE POLAROID =====
const CoffeePolaroid = ({ photo, index }) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: photo.rotate }}
      animate={inView ? {
        opacity: 1,
        y: photo.top,
        rotate: hovered ? 0 : photo.rotate,
      } : {}}
      whileHover={{
        y: photo.top - 20,
        rotate: 0,
        scale: 1.05,
        zIndex: 10,
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1A0F07',
        borderRadius: '4px',
        padding: '1rem 1rem 3rem 1rem',
        boxShadow: hovered
          ? '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,151,58,0.1)'
          : '0 8px 30px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: photo.bg,
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        marginBottom: '0.8rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {photo.image ? (
          <motion.img
            src={photo.image}
            alt={photo.label}
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
          />
        ) : (
          <motion.span
            animate={{ scale: hovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {photo.emoji}
          </motion.span>
        )}
      </div>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: '0.85rem',
        color: 'rgba(201,151,58,0.6)',
        textAlign: 'center',
      }}>
        {photo.label}
      </p>
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: '#C9973A',
        boxShadow: '0 2px 8px rgba(201,151,58,0.6)',
      }} />
    </motion.div>
  )
}

export default Coffee