import { Router } from 'express';
import cartController from '../../../controllers/cart.controller';
import isAuth from '../../../middlewares/isAuth';

const router = Router();

router
  .get('/:id', cartController.getById)
  .put('/:cartId/:action/:productId', isAuth, cartController.handleItems);
// .delete('/:cartId/:productId', isAuth, cartController.addProduct)

export default router;
