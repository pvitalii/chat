import { Request, Response } from "express";
import { IConversationService } from "../../usecase/interfaces/conversation-service.interface";

export class ConversationController {
    constructor(private conversationService: IConversationService) {}

    async createConversation(req: Request, res: Response) {
        const members: string[] = [req.body.firstUserId, req.body.secondUserId];
        console.log(typeof members)
        const createdConversation = await this.conversationService.createConversation(members);
        return res.status(200).json(createdConversation)
    }

    async deleteConversation(req: Request, res: Response) {
        const conversationId = req.params.conversationId;
        const deletedConversation = await this.conversationService.deleteConversation(conversationId);
        return res.status(200).json(deletedConversation)
    }

    async findConversations(req: Request, res: Response) {
        const { memberId } = req.params;
        const foundConversations = await this.conversationService.findConversations(memberId);
        return res.status(200).json(foundConversations)
    }
}