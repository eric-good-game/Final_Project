import Message from '../../models/message.model';

class MessageDao {
  async createMessage(message: IMessage): Promise<IMessage> {
    try {
      return await Message.create(message);
    } catch (err) {
      throw err;
    }
  }

  async getMessages(user_id: string): Promise<IMessage[]> {
    try {
      return await Message.find({
        $or: [{ to: user_id }, { to: 'all' }, { from: user_id }],
      }).sort({ createdAt: -1 });
    } catch (err) {
      throw err;
    }
  }

  async getMessagesByUser(user_id: string): Promise<IMessage[]> {
    try {
      return await Message.find({ from: user_id });
    } catch (err) {
      throw err;
    }
  }
}

const messageDao = new MessageDao();

export default messageDao;
