import mongoose from "mongoose";

// The transaction schema
const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  recurring: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
});


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
