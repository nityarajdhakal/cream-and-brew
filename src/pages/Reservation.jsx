import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Reservation = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    people: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Please enter your name'
    if (!form.date) newErrors.date = 'Please select a date'
    if (!form.time) newErrors.time = 'Please select a time'
    if (!form.people) newErrors.people = 'Please select number of people'
    return newErrors
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/reservations', form)
      setLoading(false)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setSubmitted(true)
    }
  }

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM',
  ]

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0305 0%, #1a0800 40%, #1a0510 70%, #0d0a15 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background glows */}
      <motion.div
        style={{
          position: 'absolute',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,151,58,0.07), transparent 70%)',
          top: '-150px', right: '-150px',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,133,161,0.05), transparent 70%)',
          bottom: '-100px', left: '-100px',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">

        {/* ===== FORM ===== */}
        {!submitted && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            style={{
              width: '100%',
              maxWidth: '560px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <motion.p
                style={{
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
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
                Reserve Your Table
                <span style={{ width: '2rem', height: '1px', background: '#C9973A', display: 'inline-block' }} />
              </motion.p>

              <motion.h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1.1,
                  marginBottom: '0.75rem',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Book a <em style={{ color: '#C9973A', fontStyle: 'italic' }}>Moment</em>
              </motion.h1>

              <motion.p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.3)',
                  lineHeight: 1.7,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                We'll have your table ready, your experience waiting.
              </motion.p>
            </div>

            {/* Form card */}
            <motion.div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,151,58,0.15)',
                borderRadius: '28px',
                padding: '3rem',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >

              {/* Name */}
              <div style={{ marginBottom: '1.8rem' }}>
                <label style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: errors.name
                      ? '1px solid rgba(255,100,100,0.5)'
                      : '1px solid rgba(201,151,58,0.2)',
                    borderRadius: '14px',
                    padding: '1rem 1.2rem',
                    color: 'white',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid rgba(201,151,58,0.6)'}
                  onBlur={(e) => e.target.style.border = errors.name
                    ? '1px solid rgba(255,100,100,0.5)'
                    : '1px solid rgba(201,151,58,0.2)'}
                />
                {errors.name && (
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(255,120,120,0.8)',
                    marginTop: '0.4rem',
                  }}>{errors.name}</p>
                )}
              </div>

              {/* Date */}
              <div style={{ marginBottom: '1.8rem' }}>
                <label style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}>
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: errors.date
                      ? '1px solid rgba(255,100,100,0.5)'
                      : '1px solid rgba(201,151,58,0.2)',
                    borderRadius: '14px',
                    padding: '1rem 1.2rem',
                    color: 'white',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    outline: 'none',
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid rgba(201,151,58,0.6)'}
                  onBlur={(e) => e.target.style.border = errors.date
                    ? '1px solid rgba(255,100,100,0.5)'
                    : '1px solid rgba(201,151,58,0.2)'}
                />
                {errors.date && (
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(255,120,120,0.8)',
                    marginTop: '0.4rem',
                  }}>{errors.date}</p>
                )}
              </div>

              {/* Time */}
              <div style={{ marginBottom: '1.8rem' }}>
                <label style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}>
                  Time
                </label>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setForm({ ...form, time: slot })}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '100px',
                        border: form.time === slot
                          ? '1px solid #C9973A'
                          : '1px solid rgba(201,151,58,0.2)',
                        background: form.time === slot
                          ? 'linear-gradient(135deg, #C9973A, #E8B85A)'
                          : 'rgba(255,255,255,0.03)',
                        color: form.time === slot ? 'white' : 'rgba(255,255,255,0.5)',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.time && (
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(255,120,120,0.8)',
                    marginTop: '0.4rem',
                  }}>{errors.time}</p>
                )}
              </div>

              {/* Number of People */}
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}>
                  Number of People
                </label>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setForm({ ...form, people: num })}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        border: form.people === num
                          ? '1px solid #C9973A'
                          : '1px solid rgba(201,151,58,0.2)',
                        background: form.people === num
                          ? 'linear-gradient(135deg, #C9973A, #E8B85A)'
                          : 'rgba(255,255,255,0.03)',
                        color: form.people === num ? 'white' : 'rgba(255,255,255,0.5)',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.people && (
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(255,120,120,0.8)',
                    marginTop: '0.4rem',
                  }}>{errors.people}</p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: loading
                    ? 'rgba(201,151,58,0.5)'
                    : 'linear-gradient(135deg, #C9973A, #E8B85A)',
                  color: 'white',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 30px rgba(201,151,58,0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block', fontSize: '1rem' }}
                    >
                      ⟳
                    </motion.span>
                    Confirming your table...
                  </span>
                ) : (
                  'Reserve My Table →'
                )}
              </motion.button>

            </motion.div>

            {/* Back to home */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                onClick={() => navigate(-1)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}>
                ← Back to Previous Page
              </button>
            </div>

          </motion.div>
        )}

        {/* ===== GOLDEN TICKET ===== */}
        {submitted && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
            }}
          >

            {/* Sparkles around ticket */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#C9973A' : '#FF85A1',
                  top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 60}%`,
                  left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 55}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  y: [0, -30, -60],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}

            {/* Ticket card */}
            <motion.div
              style={{
                background: 'linear-gradient(135deg, #C9973A 0%, #E8B85A 40%, #C9973A 70%, #A07820 100%)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(201,151,58,0.4), 0 0 120px rgba(201,151,58,0.15)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, left: '-100%',
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  transform: 'skewX(-20deg)',
                }}
                animate={{ left: ['−100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
              />

              {/* Ticket holes */}
              <div style={{
                position: 'absolute',
                left: '-16px', top: '50%',
                transform: 'translateY(-50%)',
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: '#0a0501',
              }} />
              <div style={{
                position: 'absolute',
                right: '-16px', top: '50%',
                transform: 'translateY(-50%)',
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: '#0a0501',
              }} />

              {/* Dashed line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '5%', right: '5%',
                height: '1px',
                borderTop: '1.5px dashed rgba(255,255,255,0.2)',
              }} />

              {/* Top half */}
              <div style={{ marginBottom: '2rem' }}>
                <motion.div
                  style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  🎟️
                </motion.div>

                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'white',
                  marginBottom: '0.3rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}>
                  Your Table is Reserved!
                </h2>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  Cream & Brew · Kathmandu
                </p>
              </div>

              {/* Bottom half — booking details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.2rem',
                marginTop: '2rem',
              }}>
                {[
                  { label: 'Guest', value: form.name },
                  { label: 'People', value: `${form.people} ${form.people === 1 ? 'Person' : 'People'}` },
                  { label: 'Date', value: new Date(form.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) },
                  { label: 'Time', value: form.time },
                ].map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      padding: '0.8rem 1rem',
                      textAlign: 'left',
                    }}
                  >
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: '0.3rem',
                    }}>
                      {detail.label}
                    </p>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'white',
                    }}>
                      {detail.value}
                    </p>
                  </motion.div>
                ))}
              </div>

            </motion.div>

            {/* Message below ticket */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '2rem',
                lineHeight: 1.7,
              }}
            >
              We look forward to welcoming you.<br />
              See you soon at Cream & Brew. 🍦☕
            </motion.p>

            {/* Back to home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ marginTop: '2rem' }}
            >
              <button 
                onClick={() => navigate(-1)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}>
                ← Back to Previous Page
              </button>
            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

export default Reservation