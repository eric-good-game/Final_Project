import { Request, Response } from 'express';
import orderService from '../services/order.service';
import logger from '../utils/logger';
import User from '../models/user.model';

class OrderController {
  #orderService = orderService;

  constructor() {
    this.createOrder = this.createOrder.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
  }
  async createOrder(req: Request, res: Response) {
    try {
      const { address, shipping, cartId } = req.body;
      const order = await this.#orderService.createOrder(cartId, req.user, {
        address,
        shipping,
      });
      res.status(201).json({ order });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async getAllOrders(req: Request, res: Response) {
    try {
      if (!(req.user instanceof User)) throw new Error('User not found');
      const orders = await this.#orderService.getAllOrders(req.user.id);
      res.status(200).json({ orders });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async getOrderById(req: Request, res: Response) {
    try {
      const order = await this.#orderService.getOrderById(req.params.id);
      res.status(200).json({ order });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const orderController = new OrderController();
export default orderController;
