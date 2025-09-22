// db/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  avatar: {
    type: String, // Google profile picture URL
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // scalable roles
    default: 'user'
  },
  age: {
    type: Number,
    default: 18
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true // since Google users are verified already
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isdeleted:{
    type:Boolean,
    default:false
  }
}, { timestamps: true }); // createdAt & updatedAt

// Create a model
const User = mongoose.model('User', userSchema);

export default User;
