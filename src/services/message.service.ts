import messageDao from '../daos/mongodb/message.dao';

class MessageService {
  #messageDao = messageDao;

  async createMessage(message: IMessage): Promise<IMessage> {
    try {
      return await this.#messageDao.createMessage(message);
    } catch (err) {
      throw err;
    }
  }

  async getMessages(user_id: string): Promise<IMessage[]> {
    try {
      return await this.#messageDao.getMessages(user_id);
    } catch (err) {
      throw err;
    }
  }

  async getMessagesByUser(user_id: string): Promise<IMessage[]> {
    try {
      return await this.#messageDao.getMessagesByUser(user_id);
    } catch (err) {
      throw err;
    }
  }
}

const messageService = new MessageService();

export default messageService;
