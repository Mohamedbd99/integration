const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: String,
  content: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['read', 'unread'], default: 'unread' },
  evaluation: { type: Number, min: 1, max: 5, default: null },
  response: String, 
  notes: String, 
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
