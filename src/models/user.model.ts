import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
// import { IUser, IUserMethods, UserModel } from '../interfaces/user.interface';

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    required: false,
    trim: true,
  },
  cartId: {
    type: Schema.Types.ObjectId || null,
    ref: 'Cart',
    required: false,
    default: null,
  },
  role: {
    type: String,
    required: false,
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  try {
    const user = this;
    return bcrypt.compare(password, user.password);
  } catch (err) {
    logger.error(err);
    return false;
  }
};

userSchema.methods.generateToken = async function (
  rememberMe: boolean = false,
) {
  try {
    const user = this;
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }
    // create a token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN },
    );
    // create a refresh token
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '7d' : '60min',
    });
    // save the token on the database
    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();
  } catch (err) {
    throw err;
  }
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
