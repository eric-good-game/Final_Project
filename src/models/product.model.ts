import { model, Schema } from 'mongoose';

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  effects: { type: [String], required: true },
  origins: { type: [String], required: true },
  classes: { type: [String], required: false, default: null },
  side_effects: { type: [String], required: false, default: null },
  rarity: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// 3. Create a Model.
const Product = model<IProduct>('Product', productSchema);

export default Product;
