import { Schema, model } from 'mongoose';

// Create Schema
const paymentSchema = new Schema({
  user: {
    type: Object,
  },
  data: {
    type: Object,
  },
  products: {
    type: Array,
    default: [],
  },
});

const Payment = model('payment', paymentSchema);

export default Payment;
