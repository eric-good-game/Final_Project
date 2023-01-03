import cartDao from '../daos/mongodb/cart.dao';

class CartService {
  #cartDao = cartDao;

  async getById(id: string): Promise<any> {
    return this.#cartDao.getById(id);
  }
  async create(userId: string): Promise<any> {
    const cart = {
      user_id: userId,
      products: [],
      amount: 0,
      total_products: 0,
    };
    try {
      return await this.#cartDao.create(cart);
    } catch (err) {
      throw err;
    }
  }
  async updateItems(
    cartId: string,
    productId: string,
    variant: string,
    action: string,
  ): Promise<ICart> {
    try {
      if (action === 'new') {
        return await this.#cartDao.addItemToCart(cartId, productId, variant);
      }
      if (action === 'delete') {
        return await this.#cartDao.deleteItem(cartId, productId);
      }
      if (action === 'add' || action === 'remove') {
        return await this.#cartDao.updateItems(cartId, productId, action);
      }
      throw new Error('Invalid action');
    } catch (err) {
      throw err;
    }
  }
  async clearCart(cartId: string): Promise<ICart> {
    try {
      return await this.#cartDao.clearCart(cartId);
    } catch (err) {
      throw err;
    }
  }
}

const cartService = new CartService();
export default cartService;
