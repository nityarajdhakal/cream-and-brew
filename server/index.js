const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Menu = require('./models/Menu')
const Reservation = require('./models/Reservation')
const Feedback = require('./models/Feedback')

const app = express()
app.use(cors())
app.use(express.json())

// ===== CONNECT MONGODB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch((err) => console.log('❌ MongoDB error:', err))

// ===== MENU ROUTES =====

// Get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const items = await Menu.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get menu by category
app.get('/api/menu/:category', async (req, res) => {
  try {
    const items = await Menu.find({ category: req.params.category })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add menu item
app.post('/api/menu', async (req, res) => {
  try {
    const item = new Menu(req.body)
    await item.save()
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update menu item
app.put('/api/menu/:id', async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete menu item
app.delete('/api/menu/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ===== RESERVATION ROUTES =====

// Get all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 })
    res.json(reservations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservation = new Reservation(req.body)
    await reservation.save()
    res.json(reservation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete reservation
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ===== FEEDBACK ROUTES =====

// Get all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 })
    res.json(feedback)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body)
    await feedback.save()
    res.json(feedback)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete feedback
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ===== START SERVER =====
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))