class BaseProductDao {
  async getAll(category: string): Promise<any> {
    // return await Product.find();
    return 'not implemented';
  }
  async getById(id: string): Promise<any> {
    return 'not implemented';
  }
  async create(product: any): Promise<any> {
    return 'not implemented';
  }
  async clearCart(cartId: string): Promise<any> {
    return 'not implemented';
  }
}

export default BaseProductDao;
