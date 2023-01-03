import { Router } from 'express';
import orderController from '../../../controllers/order.controller';
import isAuth from '../../../middlewares/isAuth';

const router = Router();

router
  .post('/', isAuth, orderController.createOrder)
  .get('/', isAuth, orderController.getAllOrders)
  .get('/:id', isAuth, orderController.getOrderById);

export default router;
