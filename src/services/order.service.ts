import orderDao from '../daos/mongodb/order.dao';
import Order from '../models/oder.model';
import User from '../models/user.model';
import sendEmail from '../utils/sendMail';
import cartService from './cart.service';

class OrderService {
  #orderDao = orderDao;
  #cartService = cartService;

  async createOrder(cartId: string, user: any, data: any): Promise<IOrder> {
    try {
      if (!(user instanceof User)) throw new Error('User not found');
      let amount: number = data.shipping;
      const cart = await this.#cartService.getById(cartId);
      const orderItems: OrderItem[] = cart.products.map((item: CartItem) => {
        const product = item.product as IProduct;
        amount += item.quantity * product.price;
        return {
          name: product.name,
          image: product._id,
          description: product.description,
          effects: product.effects,
          origins: product.origins,
          side_effects: product.side_effects,
          rarity: product.rarity,
          categories: product.category,
          price: product.price,
          weight: product.weight,
          variant: item.variant,
          quantity: item.quantity,
        };
      });

      const order: IOrder = {
        items: orderItems,
        order_num: 0,
        amount,
        total_items: cart.total_products,
        user_email: user.email,
        user_id: user._id.toString(),
        address: data.address as string,
        status: 'pending',
      };
      const newOrder = await this.#orderDao.createOrder(order);
      await this.#cartService.clearCart(cartId);
      if (newOrder instanceof Order) {
        if (newOrder) {
          sendEmail('order', newOrder.toObject());
        }
      }
      return newOrder;
    } catch (err) {
      throw err;
    }
  }
  async getAllOrders(user_id: string) {
    try {
      const orders = await this.#orderDao.getAllOrders(user_id);
      return orders;
    } catch (err) {
      throw err;
    }
  }
  async getOrderById(id: string): Promise<IOrder> {
    try {
      const order = await this.#orderDao.getOrderById(id);
      return order;
    } catch (err) {
      throw err;
    }
  }
}

const orderService = new OrderService();
export default orderService;
