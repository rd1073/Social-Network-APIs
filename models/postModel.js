const mongoose = require('mongoose');
const { conn }=require("../config/db")

const postSchema = new mongoose.Schema({
  content: { 
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Post = conn.model('Post', postSchema);

module.exports = {Post};
