import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default isAuth;
