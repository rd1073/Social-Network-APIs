const mongoose = require("mongoose")
require('dotenv').config();

const conn = mongoose.createConnection(process.env.DB_URI);
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const User = conn.model('User', userSchema);



module.exports = { conn , User};