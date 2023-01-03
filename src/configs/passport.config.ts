import passport from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import logger from '../utils/logger';
import User from '../models/user.model';
import authService from '../services/auth.service';

const options: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const jwtOptions: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      ...options,
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        const { name, phone, code } = req.body;

        const user = await User.findOne({ email }).select('_id').lean();

        if (user) {
          logger.error('User already exists');
          return done(null, false, { message: 'User already exists' });
        }

        const verificationCheck = await authService.checkVerification(
          phone,
          code,
        );

        if (!verificationCheck) {
          logger.error('Invalid verification code');
          return done(null, false, { message: 'Invalid verification code' });
        }

        const newUser = await User.create({
          email,
          password,
          name,
          phone,
        });
        if (!newUser) {
          logger.error('User not created');
          return done(null, false, { message: 'User not created' });
        }
        return done(null, newUser);
      } catch (err) {
        logger.error(err);
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(options, async function (email, password, done) {
    try {
      if (!email || !password) {
        logger.error('Email or password is empty');
        return done(null, false, { message: 'Email or password is empty' });
      }

      const user = await User.findOne({ email }).populate('cartId');

      if (!user) {
        logger.error('User not found');
        return done(null, false, { message: 'User not found' });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        logger.error('Invalid password');
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (err) {
      logger.error(err);
    }
  }),
);

passport.use(
  'jwt',
  new JWTStrategy(jwtOptions, async function (jwtPayload, done) {
    try {
      const user = await User.findById(jwtPayload._id).populate('cartId');
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      return done(null, user);
    } catch (err) {
      logger.error(err);
    }
  }),
);
