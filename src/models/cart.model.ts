import { Schema, model } from 'mongoose';

const cartSchema = new Schema<ICart>({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      variant: {
        type: String,
        required: true,
      },
    },
  ],
  total_products: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cartSchema.pre('save', async function (next) {
  const cart = this;
  cart.updatedAt = new Date();
  next();
});

const Cart = model<ICart>('Cart', cartSchema);

export default Cart;
