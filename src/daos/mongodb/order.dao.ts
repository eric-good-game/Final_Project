import Order from '../../models/oder.model';

class OrderDao {
  async createOrder(order: IOrder): Promise<IOrder> {
    try {
      const num_orders = await Order.countDocuments();
      order.order_num = num_orders + 1;
      const newOrder = await Order.create(order);
      return newOrder;
    } catch (err) {
      throw err;
    }
  }
  async getAllOrders(user_id: string) {
    try {
      const orders = await Order.find({ user_id });
      return orders;
    } catch (err) {
      throw err;
    }
  }
  async getOrderById(id: string): Promise<IOrder> {
    try {
      const order = await Order.findById(id);
      if (!order) throw new Error('Order not found');
      return order;
    } catch (err) {
      throw err;
    }
  }
}

const orderDao = new OrderDao();
export default orderDao;
