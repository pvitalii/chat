import { Router } from "express";
import { IMessageRepository } from "../../domain/interfaces/repositories/message-repository.interface";
import { MessageService } from "../../usecase/services/message.service";
import { MessageController } from "../controllers/message.controller";

export function messageRouter(messageRepository: IMessageRepository) {
    const messageService = new MessageService(messageRepository);
    const messageController = new MessageController(messageService);

    const MessageRouter = Router();

    MessageRouter.post('/create-message', messageController.createMessage.bind(messageController));
    MessageRouter.put('/edit-message', messageController.editMessage.bind(messageController));
    MessageRouter.delete('/delete-message/:messageId', messageController.deleteMessage.bind(messageController));
    MessageRouter.get('/get-messages-of-chat/:conversationId', messageController.getMessagesOfConversation.bind(messageController))

    return MessageRouter
}