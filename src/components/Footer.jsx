import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const Footer = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
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
    <footer
      ref={ref}
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0a0501 0%, #050300 100%)'
          : 'linear-gradient(180deg, #FFF0F5 0%, #FFE4EE 100%)',
        padding: '5rem 4rem 2rem',
        borderTop: isDark
          ? '1px solid rgba(201,151,58,0.1)'
          : '1px solid rgba(255,133,161,0.15)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '4rem',
          marginBottom: '4rem',
        }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              fontWeight: 900,
              color: isDark ? 'white' : '#2C1A0E',
              marginBottom: '0.5rem',
            }}>
              Cream <span style={{ color: '#C9973A' }}>&</span> Brew
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '0.88rem',
              color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(44,26,14,0.45)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              maxWidth: '280px',
            }}>
              Where every bite and sip becomes a memory. Kathmandu's finest ice cream and coffee experience.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {[
                {
                  name: 'Facebook',
                  url: 'https://www.facebook.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                  color: '#1877F2',
                },
                {
                  name: 'Instagram',
                  url: 'https://www.instagram.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                  color: '#E1306C',
                },
                {
                  name: 'TikTok',
                  url: 'https://www.tiktok.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                    </svg>
                  ),
                  color: '#010101',
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(44,26,14,0.06)',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(44,26,14,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(44,26,14,0.6)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.border = `1px solid ${social.color}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(44,26,14,0.06)'
                    e.currentTarget.style.color = isDark
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(44,26,14,0.6)'
                    e.currentTarget.style.border = isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(44,26,14,0.1)'
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: isDark ? '#C9973A' : '#FF85A1',
              marginBottom: '1.5rem',
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Ice Cream World', href: '/icecream' },
                { label: 'Coffee World', href: '/coffee' },
                { label: 'Book a Table', href: '/reservation' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.88rem',
                      color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(44,26,14,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isDark ? '#C9973A' : '#FF85A1'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDark
                        ? 'rgba(255,255,255,0.45)'
                        : 'rgba(44,26,14,0.5)'
                    }}
                  >
                    <span style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: isDark ? '#C9973A' : '#FF85A1',
                      display: 'inline-block',
                      flexShrink: 0,
                    }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visit us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: isDark ? '#C9973A' : '#FF85A1',
              marginBottom: '1.5rem',
            }}>
              Visit Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', label: 'Address', value: 'Pepsi Cola, Kathmandu\nBagmati Province, Nepal' },
                { icon: '🕐', label: 'Hours', value: 'Sun–Fri: 10am – 9pm\nSat: 10am – 10pm' },
                { icon: '📞', label: 'Contact', value: '+977-XXXX-XXXX' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                  <div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.62rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: isDark ? '#C9973A' : '#FF85A1',
                      marginBottom: '0.2rem',
                    }}>
                      {item.label}
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.82rem',
                      color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(44,26,14,0.55)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                    }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '3rem',
            height: '300px',
            border: isDark
              ? '1px solid rgba(201,151,58,0.15)'
              : '1px solid rgba(255,133,161,0.2)',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.880556216447!2d85.3582457!3d27.6908587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199026219329%3A0x776ba957e8417c8!2sPepsi%20Cola%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1715421234567!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cream & Brew Location"
          />
        </motion.div>

        {/* Bottom bar */}
        <div style={{
          borderTop: isDark
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(44,26,14,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.72rem',
            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,26,14,0.3)',
          }}>
            © 2026 Cream & Brew. Crafted with ❤️ in Kathmandu, Nepal.
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '0.78rem',
            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,26,14,0.3)',
          }}>
            Where every bite and sip becomes a memory.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer