import { Router } from 'express';
import logger from '../../../utils/logger';
import passport from 'passport';
import authController from '../../../controllers/auth.controller';
import isAuth from '../../../middlewares/isAuth';

const router = Router();

router
  .post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    authController.signup,
  )
  .post('/login', authController.login)
  .post('/send-verification', authController.sendVerification)
  .post('/verification-check', authController.verificationCheck) //quit this route
  .post('/verify-email', authController.verifyEmail)
  .post('/verifyToken', isAuth, authController.verifyToken);

export default router;
