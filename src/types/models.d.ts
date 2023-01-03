interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  phone: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
  cartId?: string | ICart;
}

interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  generateToken: (rememberMe?: boolean) => void;
}

interface IProduct {
  _id?: string;
  name: string;
  weight: number;
  effects: string[];
  origins: string[];
  classes: string[];
  side_effects: string[];
  rarity: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}
type CartItem = {
  _id?: string;
  product: string | IProduct;
  quantity: number;
  variant: string;
};

interface ICart {
  products: CartItem[];
  total_products: number;
  amount: number;
  user_id?: string;
  createdAt: Date;
  updatedAt: Date;
}
type OrderItem = {
  name: string;
  image?: string;
  description: string;
  effects: string[];
  origins: string[];
  side_effects: string[];
  rarity: string;
  price: number;
  weight: number;
  price: number;
  variant: string;
  quantity: number;
};
interface IOrder {
  items: OrderItem[];
  order_num: number;
  amount: number;
  total_items: number;
  user_email: string;
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  address: string;
}

interface IMessage {
  to: string;
  from: string;
  text: string;
  createdAt: Date;
}
