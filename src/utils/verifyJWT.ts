import jwt from 'jsonwebtoken';

const VerifyJWT = (token: string) => {
  const secret = process.env.JWT_SECRET || '';
  if (!secret) {
    throw new Error('JWT_SECRET not defined');
  }
  try {
    const decoded = jwt.verify(token, secret);
    return { err: null, valid: true, decoded };
  } catch (err) {
    return { err, valid: false, decoded: null };
  }
};

export default VerifyJWT;
