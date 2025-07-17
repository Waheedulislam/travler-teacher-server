import { Request, Response } from "express";
import * as messageService from "./message.service";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const saved = await messageService.createMessage(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Message send failed", err });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await messageService.getMessagesByConversation(
      req.params.conversationId
    );
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to get messages", err });
  }
};
