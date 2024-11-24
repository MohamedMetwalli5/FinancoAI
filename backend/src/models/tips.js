import mongoose from "mongoose";

// The tips schema
const tipsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: false,
    default: () => uuidv4()
  },
  name: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  text: {
    type: String,
    required: true  
  }
}, {
  timestamps: true
});

const Tips = mongoose.model('Tips', tipsSchema);

export default Tips;
