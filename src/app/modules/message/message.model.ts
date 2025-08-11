import mongoose, { Schema, Document } from "mongoose";

export interface IMessageDocument extends Document {
  conversationId: string;
  senderId: string;
  text: string;
}

const MessageSchema = new Schema<IMessageDocument>(
  {
    conversationId: { type: String, required: true },
    senderId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMessageDocument>("Message", MessageSchema);
