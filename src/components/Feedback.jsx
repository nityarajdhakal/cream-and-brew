import API_BASE_URL from '../config'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const FeedbackSection = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ name: '', message: '', rating: 0, category: 'both' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)
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

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/feedback`)
      setReviews(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.message || !form.rating) return
    setLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/feedback`, form)
      setSubmitted(true)
      fetchFeedback()
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', message: '', rating: 0, category: 'both' })
      }, 3000)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const accentColor = isDark ? '#C9973A' : '#FF85A1'
  const accentColorSecondary = isDark ? '#E8B85A' : '#FFB6C8'

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 4rem',
        background: isDark
          ? 'linear-gradient(180deg, #0a0501 0%, #150A04 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
          }}>
            <span style={{ width: '2rem', height: '1px', background: accentColor, display: 'inline-block' }} />
            What People Say
            <span style={{ width: '2rem', height: '1px', background: accentColor, display: 'inline-block' }} />
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            color: isDark ? 'white' : '#2C1A0E',
            lineHeight: 1.1,
          }}>
            Voices of Our <em style={{ color: accentColor, fontStyle: 'italic' }}>Guests</em>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}>

          {/* ===== LEAVE REVIEW FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: isDark ? 'white' : '#2C1A0E',
              marginBottom: '2rem',
            }}>
              Leave a <em style={{ color: accentColor }}>Review</em>
            </h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: isDark
                      ? 'rgba(201,151,58,0.08)'
                      : 'rgba(255,133,161,0.08)',
                    borderRadius: '24px',
                    border: `1px solid ${accentColor}30`,
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: isDark ? 'white' : '#2C1A0E',
                    marginBottom: '0.5rem',
                  }}>
                    Thank you, {form.name}!
                  </h4>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(44,26,14,0.5)',
                    fontSize: '0.9rem',
                  }}>
                    Your review means the world to us. ❤️
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: isDark
                      ? 'rgba(255,255,255,0.03)'
                      : 'white',
                    border: `1px solid ${accentColor}20`,
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: isDark
                      ? '0 4px 30px rgba(0,0,0,0.3)'
                      : '0 4px 30px rgba(44,26,14,0.06)',
                  }}
                >
                  {/* Name */}
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(44,26,14,0.4)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pravash gajurel"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{
                        width: '100%',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(44,26,14,0.03)',
                        border: `1px solid ${accentColor}25`,
                        borderRadius: '12px',
                        padding: '0.8rem 1rem',
                        color: isDark ? 'white' : '#2C1A0E',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Star Rating */}
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(44,26,14,0.4)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}>
                      Rating
                    </label>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={() => setForm({ ...form, rating: star })}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            filter: star <= (hoveredStar || form.rating)
                              ? 'none'
                              : 'grayscale(100%) opacity(30%)',
                            transition: 'filter 0.2s ease',
                          }}
                        >
                          ⭐
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(44,26,14,0.4)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}>
                      Reviewing
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[
                        { value: 'icecream', label: '🍦 Ice Cream' },
                        { value: 'coffee', label: '☕ Coffee' },
                        { value: 'both', label: '✨ Both' },
                      ].map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setForm({ ...form, category: cat.value })}
                          style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '100px',
                            border: form.category === cat.value
                              ? `1px solid ${accentColor}`
                              : `1px solid ${accentColor}25`,
                            background: form.category === cat.value
                              ? `${accentColor}20`
                              : 'transparent',
                            color: form.category === cat.value
                              ? accentColor
                              : isDark ? 'rgba(255,255,255,0.4)' : 'rgba(44,26,14,0.4)',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(44,26,14,0.4)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}>
                      Your Review
                    </label>
                    <textarea
                      placeholder="Tell us about your experience..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      style={{
                        width: '100%',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(44,26,14,0.03)',
                        border: `1px solid ${accentColor}25`,
                        borderRadius: '12px',
                        padding: '0.8rem 1rem',
                        color: isDark ? 'white' : '#2C1A0E',
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '100px',
                      }}
                    />
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '100px',
                      border: 'none',
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColorSecondary})`,
                      color: 'white',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      boxShadow: `0 8px 25px ${accentColor}30`,
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Review →'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ===== REVIEWS LIST ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              maxHeight: '600px',
              overflowY: 'auto',
              paddingRight: '0.5rem',
            }}
          >
            {reviews.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(44,26,14,0.02)',
                borderRadius: '20px',
                border: `1px dashed ${accentColor}20`,
              }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(44,26,14,0.3)',
                }}>
                  Be the first to leave a review!
                </p>
              </div>
            ) : (
              reviews.map((review, i) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
                    border: `1px solid ${accentColor}15`,
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: isDark
                      ? '0 4px 20px rgba(0,0,0,0.2)'
                      : '0 4px 20px rgba(44,26,14,0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accent top bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColorSecondary})`,
                    opacity: 0.5,
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.8rem',
                  }}>
                    <div>
                      <h4 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: isDark ? 'white' : '#2C1A0E',
                        marginBottom: '0.2rem',
                      }}>
                        {review.name}
                      </h4>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.62rem',
                        color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(44,26,14,0.3)',
                        letterSpacing: '0.05em',
                      }}>
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          month: 'long', day: 'numeric', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: '0.9rem',
                            filter: s <= review.rating ? 'none' : 'grayscale(100%) opacity(20%)',
                          }}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>

                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(44,26,14,0.6)',
                    marginBottom: '0.8rem',
                  }}>
                    "{review.message}"
                  </p>

                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: accentColor,
                    background: `${accentColor}12`,
                    padding: '0.2rem 0.7rem',
                    borderRadius: '100px',
                  }}>
                    {review.category === 'icecream' ? '🍦 Ice Cream'
                      : review.category === 'coffee' ? '☕ Coffee'
                      : '✨ Both'}
                  </span>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackSection