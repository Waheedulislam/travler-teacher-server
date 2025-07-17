import { Router } from "express";
import * as messageController from "./message.controller";

const router = Router();

router.post("/", messageController.sendMessage);
router.get("/:conversationId", messageController.getMessages);

export const MessagesRoutes = router;
