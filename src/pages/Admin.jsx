import API_BASE_URL from '../config'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const API = API_BASE_URL

const Admin = () => {
  const [activeTab, setActiveTab] = useState('icecream')
  const [menuItems, setMenuItems] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'icecream',
    tag: '',
    emoji: '',
  })

  // Fetch menu items
  const fetchMenu = async (category) => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/menu/${category}`)
      setMenuItems(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  // Fetch reservations
  const fetchReservations = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/reservations`)
      setReservations(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const [feedbackList, setFeedbackList] = useState([])

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API}/feedback`)
      setFeedbackList(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Delete this review?')) return
    try {
      await axios.delete(`${API}/feedback/${id}`)
      fetchFeedback()
    } catch (err) {
      console.error(err)
    }
  }

  // Handle Tab Switching and Initial Fetch
  useEffect(() => {
    if (activeTab === 'reservations') {
      fetchReservations()
    } else if (activeTab === 'feedback') {
      fetchFeedback()
    } else {
      fetchMenu(activeTab)
      setForm(prev => ({ ...prev, category: activeTab }))
    }
  }, [activeTab])

  // Submit form
  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price) return
    try {
      if (editItem) {
        await axios.put(`${API}/menu/${editItem._id}`, form)
      } else {
        await axios.post(`${API}/menu`, form)
      }
      setShowForm(false)
      setEditItem(null)
      setForm({ name: '', description: '', price: '', category: activeTab, tag: '', emoji: '' })
      fetchMenu(activeTab)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete menu item
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try {
      await axios.delete(`${API}/menu/${id}`)
      fetchMenu(activeTab)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete reservation
  const handleDeleteReservation = async (id) => {
    if (!window.confirm('Delete this reservation?')) return
    try {
      await axios.delete(`${API}/reservations/${id}`)
      fetchReservations()
    } catch (err) {
      console.error(err)
    }
  }

  // Edit item
  const handleEdit = (item) => {
    setEditItem(item)
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      tag: item.tag || '',
      emoji: item.emoji || '',
    })
    setShowForm(true)
  }

  const tabs = [
    { id: 'icecream', label: '🍦 Ice Cream Menu', color: '#FF85A1' },
    { id: 'coffee', label: '☕ Coffee Menu', color: '#C9973A' },
    { id: 'reservations', label: '📅 Reservations', color: '#7EDBB0' },
    { id: 'feedback', label: '💬 Feedback', color: '#C8E6F5' },
  ]

  const accentColor = activeTab === 'icecream'
    ? '#FF85A1'
    : activeTab === 'coffee'
      ? '#C9973A'
      : '#7EDBB0'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0305 0%, #1a0800 40%, #0d0a15 100%)',
      padding: '2rem',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.1,
              }}>
                Admin <em style={{ color: '#C9973A' }}>Dashboard</em>
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.82rem',
                marginTop: '0.3rem',
              }}>
                Cream & Brew · Kathmandu
              </p>
            </div>
            <a href="/" style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.78rem',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}>
              ← Back to Website
            </a>
          </div>
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setShowForm(false)
                setEditItem(null)
              }}
              style={{
                padding: '0.7rem 1.5rem',
                borderRadius: '100px',
                border: activeTab === tab.id
                  ? `1px solid ${tab.color}`
                  : '1px solid rgba(255,255,255,0.1)',
                background: activeTab === tab.id
                  ? `${tab.color}20`
                  : 'rgba(255,255,255,0.03)',
                color: activeTab === tab.id
                  ? tab.color
                  : 'rgba(255,255,255,0.4)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: activeTab === tab.id ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add button — only for menu tabs */}
        {activeTab !== 'reservations' && activeTab !== 'feedback' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditItem(null)
                setForm({
                  name: '', description: '', price: '',
                  category: activeTab, tag: '', emoji: '',
                })
              }}
              style={{
                padding: '0.7rem 1.5rem',
                borderRadius: '100px',
                border: 'none',
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}AA)`,
                color: 'white',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: `0 4px 20px ${accentColor}30`,
              }}
            >
              {showForm ? '✕ Cancel' : `+ Add New ${activeTab === 'icecream' ? 'Ice Cream' : 'Coffee'} Item`}
            </button>
          </motion.div>
        )}

        {/* ===== ADD/EDIT FORM ===== */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${accentColor}30`,
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '2rem',
                overflow: 'hidden',
              }}
            >
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.2rem',
                color: 'white',
                marginBottom: '1.5rem',
              }}>
                {editItem ? '✏️ Edit Item' : '➕ Add New Item'}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div>
                  <label style={labelStyle}>Item Name *</label>
                  <input
                    placeholder="e.g. Mango Gelato"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price *</label>
                  <input
                    placeholder="e.g. Rs. 250"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Tag</label>
                  <input
                    placeholder="e.g. Signature, New, Popular"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Emoji</label>
                  <input
                    placeholder="e.g. 🍦"
                    value={form.emoji}
                    onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Description *</label>
                <textarea
                  placeholder="Describe this item..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  style={{
                    ...inputStyle,
                    width: '100%',
                    resize: 'vertical',
                    minHeight: '80px',
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}BB)`,
                  color: 'white',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: `0 4px 20px ${accentColor}30`,
                }}
              >
                {editItem ? 'Save Changes ✓' : 'Add Item ✓'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== MENU ITEMS LIST ===== */}
        {activeTab !== 'reservations' && activeTab !== 'feedback' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '3rem' }}>
                Loading...
              </div>
            ) : menuItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px dashed rgba(255,255,255,0.1)',
                }}
              >
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {activeTab === 'icecream' ? '🍦' : '☕'}
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '1rem',
                }}>
                  No items yet. Add your first {activeTab === 'icecream' ? 'ice cream' : 'coffee'} item!
                </p>
              </motion.div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.2rem',
              }}>
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${accentColor}20`,
                      borderRadius: '18px',
                      padding: '1.5rem',
                      position: 'relative',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      marginBottom: '0.75rem',
                    }}>
                      <span style={{ fontSize: '2rem' }}>{item.emoji || '🍽️'}</span>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: 'white',
                          marginBottom: '0.1rem',
                        }}>
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span style={{
                            fontSize: '0.6rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: accentColor,
                            background: `${accentColor}15`,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px',
                          }}>
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </div>

                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}>
                      {item.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        color: accentColor,
                        fontSize: '1rem',
                      }}>
                        {item.price}
                      </span>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEdit(item)}
                          style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: '100px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: '100px',
                            border: '1px solid rgba(255,100,100,0.2)',
                            background: 'rgba(255,100,100,0.05)',
                            color: 'rgba(255,120,120,0.7)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== RESERVATIONS LIST ===== */}
        {activeTab === 'reservations' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '3rem' }}>
                Loading...
              </div>
            ) : reservations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px dashed rgba(255,255,255,0.1)',
                }}
              >
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  No reservations yet.
                </p>
              </motion.div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.2rem',
              }}>
                {reservations.map((res, i) => (
                  <motion.div
                    key={res._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(126,219,176,0.2)',
                      borderRadius: '18px',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: 'white',
                          marginBottom: '0.2rem',
                        }}>
                          {res.name}
                        </h3>
                        <p style={{
                          fontSize: '0.72rem',
                          color: 'rgba(255,255,255,0.3)',
                          letterSpacing: '0.05em',
                        }}>
                          {new Date(res.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteReservation(res._id)}
                        style={{
                          padding: '0.3rem 0.7rem',
                          borderRadius: '100px',
                          border: '1px solid rgba(255,100,100,0.2)',
                          background: 'rgba(255,100,100,0.05)',
                          color: 'rgba(255,120,120,0.6)',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.8rem',
                    }}>
                      {[
                        { label: 'Date', value: new Date(res.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) },
                        { label: 'Time', value: res.time },
                        { label: 'People', value: `${res.people} ${res.people === 1 ? 'person' : 'people'}` },
                        { label: 'Status', value: 'Confirmed ✓' },
                      ].map((detail, j) => (
                        <div key={j} style={{
                          background: 'rgba(255,255,255,0.04)',
                          borderRadius: '10px',
                          padding: '0.6rem 0.8rem',
                        }}>
                          <p style={{
                            fontSize: '0.58rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                            marginBottom: '0.2rem',
                          }}>
                            {detail.label}
                          </p>
                          <p style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: detail.label === 'Status' ? '#7EDBB0' : 'white',
                          }}>
                            {detail.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== FEEDBACK LIST ===== */}
        {activeTab === 'feedback' && (
          <div>
            {feedbackList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px dashed rgba(255,255,255,0.1)',
                }}
              >
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  No reviews yet.
                </p>
              </motion.div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.2rem',
              }}>
                {feedbackList.map((review, i) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(200,230,245,0.15)',
                      borderRadius: '18px',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.8rem',
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'white',
                          marginBottom: '0.2rem',
                        }}>
                          {review.name}
                        </h3>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} style={{
                              fontSize: '0.8rem',
                              filter: s <= review.rating ? 'none' : 'grayscale(100%) opacity(20%)',
                            }}>⭐</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteFeedback(review._id)}
                        style={{
                          padding: '0.3rem 0.7rem',
                          borderRadius: '100px',
                          border: '1px solid rgba(255,100,100,0.2)',
                          background: 'rgba(255,100,100,0.05)',
                          color: 'rgba(255,120,120,0.6)',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.6,
                      marginBottom: '0.8rem',
                    }}>
                      "{review.message}"
                    </p>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#C8E6F5',
                      background: 'rgba(200,230,245,0.08)',
                      padding: '0.2rem 0.7rem',
                      borderRadius: '100px',
                    }}>
                      {review.category === 'icecream' ? '🍦 Ice Cream'
                        : review.category === 'coffee' ? '☕ Coffee'
                        : '✨ Both'}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const labelStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.65rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  display: 'block',
  marginBottom: '0.5rem',
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '0.8rem 1rem',
  color: 'white',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.88rem',
  outline: 'none',
}

export default Admin;