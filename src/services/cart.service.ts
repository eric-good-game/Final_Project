import cartDao from '../daos/mongodb/cart.dao';
import Cart from '../models/cart.model';
import logger from '../utils/logger';

class CartService {
  #cartDao = cartDao;

  async getById(id: string): Promise<any> {
    try {
      const cart = await this.#cartDao.getById(id);
      let edit = false;
      cart.products = cart.products.filter((item: CartItem) => {
        if (!item.product) {
          edit = true;
          cart.total_products -= item.quantity;
          return false;
        }
        return true;
      });
      if (edit && cart instanceof Cart) {
        await cart.save();
      }
      return cart;
    } catch (err) {
      logger.error(err);
    }
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
