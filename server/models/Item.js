import { Schema, model } from 'mongoose';

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: { type: String, default: '', required: true },
  images: [{ type: String, default: '' }],
  descr: { type: String },
  type: { type: String },
  oldPrice: { type: Number },
  price: { type: Number, required: true },
  gender: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  sizes: {
    type: Array,
    default: [],
  },
  size: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  countInStock: { type: Number, min: 0, required: true },
  rating: { type: String },
  numReviews: { type: String },
  isFeatured: { type: Boolean, default: false },
});

const Item = model('item', ItemSchema);

export default Item;
