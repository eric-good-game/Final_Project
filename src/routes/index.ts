import { Request, Response, Router } from 'express';
import logger from '../utils/logger';
import apiRoute from './api';
import config from '../configs/constants';
import isAuth from '../middlewares/isAuth';
import User from '../models/user.model';

const router = Router();

router
  .use('/api/', apiRoute)
  .get('/config', isAuth, async (req: Request, res: Response) => {
    try {
      if (req.user instanceof User) {
        if (req.user.role === 'admin') {
          return res.status(200).json({ config });
        }
      }
      res.status(401).json({ message: 'Unauthorized' });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  .get('/*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: 'public' });
  });

export default router;
