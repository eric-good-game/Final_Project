import { Request, Response, Router } from 'express';
import productController from '../../../controllers/product.controller';
import isAuth from '../../../middlewares/isAuth';
import items from '../../../../products';
import productService from '../../../services/product.service';

const router = Router();

router
  .post('/', isAuth, productController.create)
  .get('/', isAuth, productController.getAll)
  .get('/:id', isAuth, productController.getById)
  .put('/:id', isAuth, productController.updateById)
  .delete('/:id', isAuth, productController.deleteById);

export default router;
