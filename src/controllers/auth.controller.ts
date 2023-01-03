import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import authService from '../services/auth.service';
import passport from 'passport';
import UserDTO from '../dtos/user.dto';
class AuthController {
  #authService = authService;

  constructor() {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.sendVerification = this.sendVerification.bind(this);
    this.verificationCheck = this.verificationCheck.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.#authService.signup(req.user);
      return res.status(201).json({ user });
    } catch (err) {
      logger.error(err);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      'login',
      { session: false },
      async (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: 'User or password incorrect',
            user: user,
          });
        }

        const userDTO: UserDTO = await this.#authService.login(user);
        return res.status(200).json({ user: userDTO });
      },
    )(req, res, next);
  }
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.#authService.verifyToken(req.user);
      return res.status(200).json({ user });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Invalid token' });
    }
  }
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await this.#authService.verifyEmail(req.body.email);
      if (status) {
        return res.status(200).json({ emailExists: true });
      }
      return res.status(200).json({ emailExists: false });
    } catch (err) {
      logger.error(err);
    }
  }
  async sendVerification(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.phone) {
        return res.status(400).send('Missing phone number');
      }
      const verification = await this.#authService.sendVerification(
        req.body.phone,
      );
      if (!verification) {
        return res.status(500).send('Verification failed');
      }
      logger.info(verification);
      res.sendStatus(200);
    } catch (err) {
      logger.error(err);
      res.status(500).send(err);
    }
  }
  async verificationCheck(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.phone || !req.body.code) {
        return res.status(400).send('Missing phone number or code');
      }
      const verification_check = await this.#authService.checkVerification(
        req.body.phone,
        req.body.code,
      );
      if (!verification_check) {
        return res.status(500).send('Verification failed');
      }
      logger.info(verification_check);
      if (verification_check.status !== 'approved') {
        return res.status(500).send('Verification failed');
      }
      res.status(200).send('Verification successful');
    } catch (err) {
      logger.error(err);
      res.status(500).send(err);
    }
  }
}

const authController = new AuthController();

export default authController;
