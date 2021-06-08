import { Schema, model } from 'mongoose';

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    default: {},
  },
  role: {
    type: String,
    default: 'customer',
    enum: ['customer', 'admin', 'employer'],
  },
  cartItems: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const User = model('user', UserSchema);

export default User;
