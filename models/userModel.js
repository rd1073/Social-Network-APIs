const mongoose = require("mongoose");
const conn=require("../config/db")
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  _id: {
    type: String,
    default: uuidv4
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

module.exports ={ User};
