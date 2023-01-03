class BaseOrderDao {
  async createOrder(order: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export default BaseOrderDao;
