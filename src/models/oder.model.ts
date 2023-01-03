import { Schema, model } from 'mongoose';

const orderSchema = new Schema<IOrder>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  total_items: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  order_num: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: true,
      },
      effects: {
        type: [String],
        required: true,
      },
      origins: {
        type: [String],
        required: true,
      },
      side_effects: {
        type: [String],
        required: true,
      },
      rarity: {
        type: String,
        required: true,
      },
      categories: {
        type: [String],
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      variant: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
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

const Order = model<IOrder>('Order', orderSchema);

export default Order;
