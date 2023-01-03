class BaseCartDao {
  async getById(id: string, products: boolean): Promise<any> {
    return 'not implemented';
  }
  async create(cart: any): Promise<any> {
    return 'not implemented';
  }
  async addProduct(cartId: string, productId: string): Promise<any> {
    return 'not implemented';
  }
}

export default BaseCartDao;
