import { Router } from 'express';
import authRoute from './v1/auth';
import productRoute from './v1/products';
import cartRoute from './v1/cart';
import orderRoute from './v1/orders';
const router = Router();

router
  .get('/', (req, res) => {
    res.send('Hello World!');
  })
  .use('/v1/auth', authRoute)
  .use('/v1/products', productRoute)
  .use('/v1/cart', cartRoute)
  .use('/v1/orders', orderRoute);

export default router;
