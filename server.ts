import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import messageService from './src/services/message.service';
import VerifyJWT from './src/utils/verifyJWT';
import app from './src/app';
import logger from './src/utils/logger';
import { IMessage } from './types/models';

const server = new HttpServer(app);

const io = new IOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

server.on('error', logger.error);

const adminID = process.env.ADMIN_ID || '';
const socketsID: { [key: string]: string } = {};
io.on('connection', (socket) => {
  logger.info('user connected');
  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
  socket.on(
    'chat message',
    async ({ token, msg }: { token: string; msg: IMessage }) => {
      const { err, valid, decoded } = VerifyJWT(token);
      if (!valid) {
        logger.error(err);
        return;
      }
      msg.from = msg.from === adminID ? 'admin' : msg.from;
      const message = await messageService.createMessage(msg);

      if (msg.to === 'all') {
        io.emit('chat message', message);
        return;
      }
      const socketID = socketsID[msg.to];

      if (socketID) {
        io.to(socket.id).to(socketID).emit('chat message', message);
      } else {
        io.to(socket.id).emit('chat message', message);
      }
      // logger.info('message: ' + JSON.stringify(msg));
      // socket.emit('chat message', msg);
    },
  );
  socket.on('chat initializing', async (token: string) => {
    try {
      const { err, valid, decoded } = VerifyJWT(token);
      if (!valid) {
        logger.error(err);
        return;
      }
      if (typeof decoded === 'string') throw new Error('No user id found');
      const user_id = decoded?._id === adminID ? 'admin' : decoded?._id;
      socketsID[user_id] = socket.id;

      const messages = await messageService.getMessages(user_id);

      socket.emit('chat initializing', messages);
    } catch (err) {
      logger.error(err);
    }
  });
});
