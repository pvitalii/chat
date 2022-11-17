import { Request, Response } from "express";
import { IMessageService } from "../../usecase/interfaces/message-service.interface";

export class MessageController {
    constructor(private messageService: IMessageService) { }

    async createMessage(req: Request, res: Response) {
        const {text, senderId, conversationId} = req.body;
        const createdMessage = await this.messageService.createMessage({text, senderId, conversationId});
        return res.status(200).json(createdMessage)
    }

    async editMessage(req: Request, res: Response) {
        const {messageId, text} = req.body;
        const editedMessage = await this.messageService.editMessage({messageId, text})
        return res.status(200).json(editedMessage)
    }

    async deleteMessage(req: Request, res: Response) {
        const { messageId } = req.params;
        const deletedMessage = await this.messageService.deleteMessage(messageId);
        return res.status(200).json(deletedMessage)
    }

    async getMessagesOfConversation(req: Request, res: Response) {
        const { conversationId } = req.params;
        const messages = await this.messageService.getMessagesOfConversation(conversationId)
        return res.status(200).json(messages)
    }
}