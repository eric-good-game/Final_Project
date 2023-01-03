import mongoose from 'mongoose';
import logger from '../utils/logger';

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    const mongodb_uri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/express-typescript';
    await mongoose.connect(mongodb_uri);
    logger.info({ message: 'MongoDB connected' });
  } catch (err) {
    logger.error(err);
  }
};
connect();
// export default connect;
