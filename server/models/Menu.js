const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, enum: ['icecream', 'coffee'], required: true },
  tag: { type: String },
  emoji: { type: String },
  available: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Menu', menuSchema)