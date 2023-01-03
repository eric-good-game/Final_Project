import { Request, Response } from 'express';
import cartService from '../services/cart.service';
import logger from '../utils/logger';

class CartController {
  #cartService = cartService;

  constructor() {
    this.getById = this.getById.bind(this);
    this.handleItems = this.handleItems.bind(this);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    logger.info(`Getting cart with id: ${id}`);
    const cart = await this.#cartService.getById(id);
    res.status(200).json({ cart });
  }
  async handleItems(req: Request, res: Response): Promise<void> {
    try {
      const { cartId, productId, action } = req.params;
      const { variant } = req.body;

      const cart = await this.#cartService.updateItems(
        cartId,
        productId,
        variant,
        action,
      );
      res.status(200).json({ cart });
    } catch (err) {
      logger.error(err);
    }
  }
}

const cartController = new CartController();
export default cartController;
