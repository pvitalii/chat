import { Router } from "express";
import { IConversationRepository } from "../../domain/interfaces/repositories/conversation-repository.interface";
import { ConversationService } from "../../usecase/services/conversation.service";
import { ConversationController } from "../controllers/conversation.controller";

export function conversationRouter(conversationRepository: IConversationRepository) {
    const conversationService = new ConversationService(conversationRepository);
    const conversationController = new ConversationController(conversationService);

    const ConversationRouter = Router();

    ConversationRouter.post('/create-chat', conversationController.createConversation.bind(conversationController));
    ConversationRouter.delete('/delete-chat/:conversationId', conversationController.deleteConversation.bind(conversationController));
    ConversationRouter.get('/get-chats/:memberId', conversationController.findConversations.bind(conversationController))

    return ConversationRouter
}