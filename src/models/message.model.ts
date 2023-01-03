import { Schema, model } from 'mongoose';

const messageSchema = new Schema<IMessage>({
  to: {
    type: String,
    required: false,
    default: 'admin',
  },
  from: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
