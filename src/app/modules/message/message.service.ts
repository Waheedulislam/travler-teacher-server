import MessageModel from "./message.model";
import { IMessage } from "./message.interface";

export const createMessage = async (data: IMessage) => {
  const message = new MessageModel(data);
  return await message.save();
};

export const getMessagesByConversation = async (conversationId: string) => {
  return await MessageModel.find({ conversationId });
};
