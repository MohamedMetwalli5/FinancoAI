import mongoose from "mongoose";

// The preferences schema
const preferencesSchema = new mongoose.Schema({
  timezone: {
    type: String,
    required: true,
    default: 'UTC'
  },
  emailNotifications: {
    type: Boolean,
    required: true,
    default: false
  }
});

// The user schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true 
  },
  name: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  passwordHash: {
    type: String,
    required: true  
  },
  preferences: preferencesSchema  
}, {
  timestamps: true
});


const User = mongoose.model('User', userSchema);

export default User;
