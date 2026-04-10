import axios from 'axios'
import API_BASE_URL from '../config'
import FeedbackSection from '../components/Feedback'
import Footer from '../components/Footer'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const IceCream = () => {
  const mountainRef = useRef(null)
  const softserveRef = useRef(null)
  const [inViewMenu, setInViewMenu] = useState(false)
  const menuRef = useRef(null)
  const [dbMenuItems, setDbMenuItems] = useState([])
  const [dbLoading, setDbLoading] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5)
      const y = (e.clientY / window.innerHeight - 0.5)
      if (mountainRef.current) {
        mountainRef.current.style.transform = `translate(${x * 30}px, ${y * 15}px)`
      }
      if (softserveRef.current) {
        softserveRef.current.style.transform = `translate(${x * -20}px, ${y * -10}px)`
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
        const res = await axios.get(`${API_BASE_URL}/menu/icecream`)
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
      name: 'Colour Plate',
      tag: 'Signature',
      desc: 'Gelato served on a hand-painted ceramic plate — a canvas of flavour and colour. Our most photographed creation.',
      flavours: ['Strawberry', 'Pistachio', 'Mango'],
      emoji: '🎨',
      color: '#FF85A1',
      bg: 'linear-gradient(135deg, #FFF0F5, #FFE4EE)',
      textColor: '#C4365A',
    },
    {
      name: 'Italian Gelato',
      tag: 'Classic',
      desc: 'Slow-churned, dense and velvety. Authentic Italian technique with Nepali soul — cardamom, saffron, and more.',
      flavours: ['Cardamom', 'Saffron Rose', 'Hazelnut'],
      emoji: '🇮🇹',
      color: '#C9973A',
      bg: 'linear-gradient(135deg, #FFFBEA, #FFF3C8)',
      textColor: '#8B6400',
    },
    {
      name: 'Pop Ice Cream',
      tag: 'Fun',
      desc: 'Lollipop-style frozen treats — hand-dipped, chocolate coated, rolled in toppings. Joy on a stick.',
      flavours: ['Dark Choco', 'Matcha', 'Berry Blast'],
      emoji: '🍭',
      color: '#7EDBB0',
      bg: 'linear-gradient(135deg, #F0FFF8, #E0FFF4)',
      textColor: '#1A7A50',
    },
    {
      name: 'Soft Serve',
      tag: 'Daily Special',
      desc: 'Pillowy clouds of soft serve in rotating seasonal flavours, topped with housemade sauces and crumbles.',
      flavours: ['Vanilla Mist', 'Strawberry Sky', 'Matcha Dew'],
      emoji: '🍦',
      color: '#BF8FFF',
      bg: 'linear-gradient(135deg, #F5F0FF, #EBE0FF)',
      textColor: '#6B3FA0',
    },
  ]

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#FFF8FC',
      overflowX: 'hidden',
    }}>

      {/* ===== HERO SECTION ===== */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* Colourful background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #FFF0F5 0%, #FFF5E0 30%, #F0FFF8 60%, #F5F0FF 100%)',
        }} />

        {/* Decorative colour blobs */}
        <motion.div animate={{ scale: [1, 1.1, 1], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,133,161,0.2), transparent 70%)',
            top: '-100px', left: '-100px', pointerEvents: 'none',
          }} />
        <motion.div animate={{ scale: [1.1, 1, 1.1], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(126,219,176,0.2), transparent 70%)',
            bottom: '0', right: '0', pointerEvents: 'none',
          }} />
        <motion.div animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(191,143,255,0.15), transparent 70%)',
            top: '30%', right: '20%', pointerEvents: 'none',
          }} />

        {/* Mountains */}
        <div ref={mountainRef} style={{
          position: 'absolute', inset: 0,
          transition: 'transform 0.1s ease-out',
          pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', bottom: '15%', width: '120%', left: '-10%' }}
            preserveAspectRatio="none"
          >
            <polygon points="0,600 200,200 350,350 500,150 650,300 800,100 950,280 1100,180 1250,320 1440,200 1440,600"
              fill="rgba(220,235,248,0.6)" />
            <polygon points="500,150 472,225 528,225" fill="white" opacity="0.9" />
            <polygon points="800,100 770,188 830,188" fill="white" opacity="0.9" />
            <polygon points="1100,180 1074,258 1126,258" fill="white" opacity="0.85" />
            <polygon points="0,600 150,350 300,450 500,280 700,400 900,260 1100,380 1300,300 1440,380 1440,600"
              fill="rgba(200,235,210,0.5)" />
          </svg>
        </div>

        {/* Giant Soft Serve */}
        <motion.div ref={softserveRef}
          style={{
            position: 'absolute', right: '5%', bottom: '0',
            zIndex: 4, transition: 'transform 0.15s ease-out',
          }}
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="240" height="380" viewBox="0 0 280 420"
              xmlns="http://www.w3.org/2000/svg"
              style={{ maxWidth: '40vw' }}
            >
              <defs>
                <radialGradient id="swirl1" cx="40%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFF0F5" />
                  <stop offset="50%" stopColor="#FFD6E6" />
                  <stop offset="100%" stopColor="#FFB6C8" />
                </radialGradient>
                <radialGradient id="swirl2" cx="40%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#F5F0FF" />
                  <stop offset="50%" stopColor="#D4BAFF" />
                  <stop offset="100%" stopColor="#BF8FFF" />
                </radialGradient>
                <linearGradient id="coneG2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F0C080" />
                  <stop offset="100%" stopColor="#A05C2A" />
                </linearGradient>
              </defs>
              <polygon points="140,420 60,230 220,230" fill="url(#coneG2)" />
              <polygon points="140,420 60,230 95,230" fill="rgba(255,255,255,0.15)" />
              {[245,265,288,312,338,366].map((y,i) => (
                <line key={i} x1={60+i*10} y1={y} x2={220-i*10} y2={y}
                  stroke="#8B5020" strokeWidth="1.5" strokeOpacity="0.3" />
              ))}
              <ellipse cx="140" cy="225" rx="75" ry="30" fill="url(#swirl1)" />
              <ellipse cx="140" cy="200" rx="70" ry="28" fill="url(#swirl2)" />
              <ellipse cx="140" cy="176" rx="64" ry="26" fill="url(#swirl1)" />
              <ellipse cx="140" cy="153" rx="58" ry="24" fill="url(#swirl2)" />
              <ellipse cx="140" cy="131" rx="50" ry="22" fill="url(#swirl1)" />
              <ellipse cx="140" cy="110" rx="42" ry="19" fill="url(#swirl2)" />
              <ellipse cx="140" cy="91" rx="34" ry="16" fill="url(#swirl1)" />
              <ellipse cx="140" cy="74" rx="26" ry="13" fill="url(#swirl2)" />
              <ellipse cx="140" cy="59" rx="18" ry="10" fill="url(#swirl1)" />
              <ellipse cx="140" cy="47" rx="11" ry="7" fill="url(#swirl2)" />
              <ellipse cx="140" cy="38" rx="5" ry="5" fill="#FFB6C8" />
              <ellipse cx="118" cy="210" rx="14" ry="8" fill="rgba(255,255,255,0.4)" />
              <ellipse cx="122" cy="168" rx="12" ry="6" fill="rgba(255,255,255,0.35)" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Hero Text */}
        <div style={{
          position: 'relative', zIndex: 5,
          maxWidth: '580px',
          padding: '6rem 2rem 2rem 2rem',
          marginRight: '15%',
        }}>
          <motion.p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#FF85A1',
              marginBottom: '1rem', display: 'flex',
              alignItems: 'center', gap: '0.8rem',
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: '#FF85A1' }} />
            Cream & Brew · Ice Cream
          </motion.p>

          <motion.h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, lineHeight: 1.05,
              marginBottom: '1.5rem',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            <span style={{ color: '#FF85A1' }}>Scoops</span>{' '}
            <span style={{ color: '#2C1A0E' }}>that</span><br />
            <span style={{ color: '#BF8FFF' }}>steal</span>{' '}
            <span style={{ color: '#2C1A0E' }}>your</span>{' '}
            <span style={{ color: '#7EDBB0' }}>heart</span>
          </motion.h1>

          <motion.p
            style={{
              fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
              fontSize: '1rem', lineHeight: 1.8,
              color: 'rgba(44,26,14,0.55)',
              marginBottom: '1.5rem', maxWidth: '420px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
          >
            Where every scoop is plated like a painting, every flavour tells a story, and every visit becomes a memory you carry home.
          </motion.p>

          {/* Colourful flavour tags */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { label: 'Strawberry', color: '#FF85A1', bg: '#FFF0F5' },
              { label: 'Pistachio', color: '#7EDBB0', bg: '#F0FFF8' },
              { label: 'Mango', color: '#C9973A', bg: '#FFFBEA' },
              { label: 'Lavender', color: '#BF8FFF', bg: '#F5F0FF' },
              { label: 'Cardamom', color: '#E8B85A', bg: '#FFF8E8' },
            ].map((tag) => (
              <span key={tag.label} style={{
                padding: '0.3rem 0.9rem',
                borderRadius: '100px',
                background: tag.bg,
                color: tag.color,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                border: `1px solid ${tag.color}30`,
              }}>
                {tag.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.a href="#menu"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #FF85A1, #BF8FFF)',
                color: 'white', padding: '0.9rem 2rem',
                borderRadius: '100px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem', fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255,133,161,0.35)',
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              Explore Menu 🍦
            </motion.a>
            <motion.a href="#experience"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent', color: '#2C1A0E',
                border: '1.5px solid rgba(44,26,14,0.2)',
                padding: '0.9rem 2rem', borderRadius: '100px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem', fontWeight: 500,
                cursor: 'pointer', textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Our Story
            </motion.a>
          </motion.div>
        </div>

        {/* Book a Table */}
        <motion.a href="/reservation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            zIndex: 10,
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,133,161,0.4)',
            borderRadius: '100px', padding: '0.65rem 1.4rem',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem', fontWeight: 500,
            color: '#FF85A1', textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#FF85A1', display: 'inline-block',
          }} />
          Book a Table
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.5rem', zIndex: 5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(44,26,14,0.35)',
          }}>Scroll</p>
          <motion.div
            style={{
              width: '1px', height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,133,161,0.6), transparent)',
            }}
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* ===== MENU SECTION ===== */}
      <div id="menu" ref={menuRef} style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        background: 'linear-gradient(180deg, #FFF8FC 0%, #FFFFFF 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '4rem' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inViewMenu ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#FF85A1', marginBottom: '1rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#FF85A1', display: 'inline-block' }} />
              What We Serve
              <span style={{ width: '2rem', height: '1px', background: '#FF85A1', display: 'inline-block' }} />
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900, lineHeight: 1.1,
            }}>
              <span style={{ color: '#FF85A1' }}>The</span>{' '}
              <span style={{ color: '#2C1A0E' }}>Ice Cream</span>{' '}
              <em style={{ color: '#BF8FFF', fontStyle: 'italic' }}>Menu</em>
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
              fontSize: '1rem', color: 'rgba(44,26,14,0.45)',
              marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0',
            }}>
              Each creation is crafted fresh, plated with care, and served with love.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1.5rem',
          }}>
            {dbLoading ? (
              <div style={{
                gridColumn: '1 / -1', textAlign: 'center',
                padding: '3rem', color: 'rgba(44,26,14,0.3)',
                fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
              }}>
                Loading menu...
              </div>
            ) : dbMenuItems.length > 0 ? (
              dbMenuItems.map((item, i) => (
                <MenuCard
                  key={item._id}
                  item={{
                    name: item.name,
                    tag: item.tag || 'Special',
                    desc: item.description,
                    flavours: [],
                    emoji: item.emoji || '🍦',
                    color: '#FF85A1',
                    bg: 'linear-gradient(135deg, #FFF0F5, #FFE4EE)',
                    textColor: '#C4365A',
                    price: item.price,
                  }}
                  index={i}
                  inView={inViewMenu}
                />
              ))
            ) : (
              menuItems.map((item, i) => (
                <MenuCard key={i} item={item} index={i} inView={inViewMenu} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ===== EXPERIENCE SECTION ===== */}
      <div id="experience" style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8FC 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#FF85A1', marginBottom: '1rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#FF85A1', display: 'inline-block' }} />
              Why We Are Different
              <span style={{ width: '2rem', height: '1px', background: '#FF85A1', display: 'inline-block' }} />
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900, lineHeight: 1.1,
            }}>
              <span style={{ color: '#2C1A0E' }}>Not Just Ice Cream —</span><br />
              <em style={{ color: '#FF85A1', fontStyle: 'italic' }}>An</em>{' '}
              <em style={{ color: '#BF8FFF', fontStyle: 'italic' }}>Experience</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { num: '01', title: 'A Feast for the Eyes', desc: 'Every dish is plated like a painting. Our colour plate concept transforms ice cream into edible art you will want to photograph before you eat.', emoji: '🎨', color: '#FF85A1' },
              { num: '02', title: 'Mountain Soul', desc: 'Himalayan prayer flags, snowy peaks, and locally sourced ingredients — Nepal is woven into every detail of your experience.', emoji: '🏔️', color: '#7EDBB0' },
              { num: '03', title: 'Made Fresh Daily', desc: 'Small batch, handcrafted, no shortcuts. Every scoop is made fresh each morning because you deserve the real thing every time.', emoji: '🫶', color: '#BF8FFF' },
              { num: '04', title: 'Flavours of Nepal', desc: 'Cardamom, saffron, tulsi, and local seasonal fruits. We take Nepali ingredients and turn them into world-class ice cream.', emoji: '🌿', color: '#C9973A' },
            ].map((card, i) => (
              <ExperienceCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== POLAROID GALLERY ===== */}
      <div style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        background: '#FFF8FC', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#FF85A1', marginBottom: '1rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.8rem',
            }}>
              <span style={{ width: '2rem', height: '1px', background: '#FF85A1', display: 'inline-block' }} />
              The Vibe
              <span style={{ width: '2rem', height: '1px', background: '#FF85A1', display: 'inline-block' }} />
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
            }}>
              <span style={{ color: '#FF85A1' }}>See</span>{' '}
              <span style={{ color: '#2C1A0E' }}>It.</span>{' '}
              <em style={{ color: '#BF8FFF', fontStyle: 'italic' }}>Feel It.</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            {[
              { label: 'Colour Plate', bg: 'linear-gradient(135deg, #FFD6E0, #FF9EB5)', rotate: -3, emoji: '🎨', top: 0 },
              { label: 'Soft Serve', bg: 'linear-gradient(135deg, #F5F0FF, #D4BAFF)', rotate: 2, emoji: '🍦', top: 20 },
              { label: 'Italian Gelato', bg: 'linear-gradient(135deg, #FFFBEA, #FFE07A)', rotate: -2, emoji: '🇮🇹', top: 0 },
              { label: 'Pop Ice Cream', bg: 'linear-gradient(135deg, #E0FFF4, #7EDBB0)', rotate: 3, emoji: '🍭', top: 20 },
              { label: 'The Space', bg: 'linear-gradient(135deg, #FFF0F5, #FFB6C8)', rotate: -1, emoji: '✨', top: 0 },
              { label: 'Made Fresh', bg: 'linear-gradient(135deg, #F0F8FF, #C8E6F5)', rotate: 2, emoji: '🫶', top: 10 },
            ].map((photo, i) => (
              <PolaroidCard key={i} photo={photo} index={i} />
            ))}
          </div>
        </div>
      </div>

      <FeedbackSection theme="light" />
      <Footer theme="light" />

    </div>
  )
}

// ===== MENU CARD =====
const MenuCard = ({ item, index, inView }) => {
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
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? `0 30px 60px ${item.color}30`
          : '0 4px 20px rgba(44,26,14,0.06)',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        border: `2px solid ${item.color}20`,
      }}
    >
      {hovered && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
          style={{
            position: 'absolute', top: 0,
            left: '20%', right: '20%',
            height: '4px',
            background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
            borderRadius: '0 0 10px 10px',
            transformOrigin: 'top',
          }}
        />
      )}

      {/* Tag */}
      <div style={{
        display: 'inline-block',
        padding: '0.3rem 0.9rem',
        borderRadius: '100px',
        background: `${item.color}20`,
        color: item.textColor || item.color,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.62rem', fontWeight: 600,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        marginBottom: '1.2rem',
        border: `1px solid ${item.color}40`,
      }}>
        {item.tag}
      </div>

      {/* Emoji */}
      <div style={{
        fontSize: '2.5rem', marginBottom: '0.8rem',
        transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0deg)',
        transition: 'transform 0.3s ease',
        display: 'inline-block',
      }}>
        {item.emoji}
      </div>

      {/* Name — colourful */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
        fontWeight: 700,
        color: item.textColor || item.color,
        marginBottom: '0.6rem',
        display: 'block',
      }}>
        {item.name}
      </h3>

      <p style={{
        fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
        fontSize: '0.85rem', lineHeight: 1.7,
        color: 'rgba(44,26,14,0.55)', marginBottom: '1.2rem',
      }}>
        {item.desc}
      </p>

      {/* Flavours */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
        marginBottom: item.price ? '1rem' : '0',
      }}>
        {item.flavours && item.flavours.map((f, j) => (
          <span key={j} style={{
            padding: '0.2rem 0.7rem', borderRadius: '100px',
            border: `1px solid ${item.color}40`,
            color: item.textColor || item.color,
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem',
          }}>
            {f}
          </span>
        ))}
      </div>

      {/* Price */}
      {item.price && (
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, fontSize: '1.1rem',
          color: item.textColor || item.color,
        }}>
          {item.price}
        </p>
      )}

      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '60px',
            background: `linear-gradient(to top, ${item.color}15, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  )
}

// ===== EXPERIENCE CARD =====
const ExperienceCard = ({ card, index }) => {
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
        background: 'white',
        borderRadius: '24px',
        padding: '2rem 1.8rem',
        boxShadow: hovered
          ? `0 20px 50px ${card.color}25`
          : '0 4px 20px rgba(44,26,14,0.05)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
        border: hovered ? `2px solid ${card.color}30` : '2px solid transparent',
      }}
    >
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '4rem', fontWeight: 900,
        color: `${card.color}15`,
        lineHeight: 1, display: 'block',
        marginBottom: '-0.8rem',
      }}>
        {card.num}
      </span>
      <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>
        {card.emoji}
      </span>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.15rem', fontWeight: 700,
        color: card.color, marginBottom: '0.6rem',
      }}>
        {card.title}
      </h3>
      <p style={{
        fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
        fontSize: '0.85rem', lineHeight: 1.7,
        color: 'rgba(44,26,14,0.5)',
      }}>
        {card.desc}
      </p>
      <div style={{
        position: 'absolute', left: 0, top: '20%', bottom: '20%',
        width: '3px',
        background: `linear-gradient(to bottom, ${card.color}, ${card.color}50)`,
        borderRadius: '10px',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />
    </motion.div>
  )
}

// ===== POLAROID CARD =====
const PolaroidCard = ({ photo, index }) => {
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
      initial={{ opacity: 0, y: 40, rotate: photo.rotate }}
      animate={inView ? { opacity: 1, y: photo.top, rotate: photo.rotate } : {}}
      whileHover={{ y: photo.top - 15, rotate: 0, scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '4px',
        padding: '0.8rem 0.8rem 2.5rem 0.8rem',
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.1)',
        cursor: 'pointer', position: 'relative',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{
        width: '100%', aspectRatio: '1',
        background: photo.bg, borderRadius: '2px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        marginBottom: '0.6rem', overflow: 'hidden',
      }}>
        <motion.span
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {photo.emoji}
        </motion.span>
      </div>
      <p style={{
        fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
        fontSize: '0.8rem', color: 'rgba(44,26,14,0.5)',
        textAlign: 'center',
      }}>
        {photo.label}
      </p>
      <div style={{
        position: 'absolute', top: '-8px', left: '50%',
        transform: 'translateX(-50%)',
        width: '10px', height: '10px',
        borderRadius: '50%', background: '#FF85A1',
        boxShadow: '0 2px 8px rgba(255,133,161,0.5)',
      }} />
    </motion.div>
  )
}

export default IceCream