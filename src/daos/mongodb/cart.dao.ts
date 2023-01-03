import Cart from '../../models/cart.model';
import Product from '../../models/product.model';
import logger from '../../utils/logger';

class CartDao {
  async getById(id: string): Promise<ICart> {
    try {
      const cart = await Cart.findById(id).populate('products.product');
      if (!cart) throw new Error('Cart not found');
      return cart;
    } catch (err) {
      throw err;
    }
  }
  async create(cart: any): Promise<ICart> {
    try {
      const newCart = await Cart.create(cart);
      if (!newCart) throw new Error('Cart not found');
      return newCart;
    } catch (err) {
      throw err;
    }
  }
  async addItemToCart(
    cartId: string,
    productId: string,
    variant: string,
  ): Promise<ICart> {
    try {
      const cart = await Cart.findById(cartId).populate('products.product');

      if (!cart) throw new Error('Cart not found');
      let exists = false;
      const items = cart.products.map((item: CartItem) => {
        if (item.product instanceof Product) {
          if (
            item.product._id.toString() === productId &&
            item.variant === variant
          ) {
            exists = true;
            item.quantity++;
            return item;
          }
        }
        return item;
      });
      if (!exists) {
        items.push({
          product: productId,
          quantity: 1,
          variant,
        });
      }

      cart.total_products++;
      cart.products = items;
      await cart.save();
      return cart;
    } catch (err) {
      throw err;
    }
  }
  async updateItems(
    cartId: string,
    itemId: string,
    action: string,
  ): Promise<ICart> {
    try {
      const quantity = action === 'add' ? 1 : -1;
      const cart = await Cart.findById(cartId).populate('products.product');

      if (!cart) throw new Error('Cart not found');
      const items: CartItem[] = [];
      cart.products.forEach((item: CartItem) => {
        if (item.product instanceof Product) {
          if (item._id == itemId) {
            item.quantity += quantity;
            if (item.quantity <= 0) {
              return;
            }
            return items.push(item);
          }
        }
        items.push(item);
      });

      cart.total_products += quantity;
      if (cart.total_products < 0) cart.total_products = 0;
      cart.products = items;
      await cart.save();
      return cart;
    } catch (err) {
      throw err;
    }
  }
  async deleteItem(cartId: string, itemId: string): Promise<ICart> {
    try {
      const cart = await Cart.findById(cartId).populate('products.product');

      if (!cart) throw new Error('Cart not found');
      let deleteItemQuantity: number = 0;
      const items: CartItem[] = cart.products.filter((item: CartItem) => {
        if (item.product instanceof Product) {
          if (item._id!.toString() === itemId) {
            deleteItemQuantity = item.quantity;
            return false;
          }
          return true;
        }
      });

      if (!deleteItemQuantity) throw new Error('Item not found');

      cart.total_products -= deleteItemQuantity;
      if (cart.total_products < 0) cart.total_products = 0;
      cart.products = items;
      await cart.save();
      return cart;
    } catch (err) {
      throw err;
    }
  }
  async clearCart(cartId: string): Promise<ICart> {
    try {
      const cart = await Cart.findById(cartId).populate('products.product');

      if (!cart) throw new Error('Cart not found');
      cart.total_products = 0;
      cart.products = [];
      cart.createdAt = new Date();
      await cart.save();
      return cart;
    } catch (err) {
      throw err;
    }
  }
}

const cartDao = new CartDao();
export default cartDao;
