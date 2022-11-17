import { ConversationEntity } from "../../domain/entities/conversation.entity";
import { IConversationRepository } from "../../domain/interfaces/repositories/conversation-repository.interface";
import { IConversationService } from "../interfaces/conversation-service.interface";

export class ConversationService implements IConversationService {
    constructor(private conversationRepository: IConversationRepository) {}

    async createConversation(members: string[]): Promise<ConversationEntity> {
        return this.conversationRepository.createConversation(members)
    }

    async deleteConversation(conversationId: string): Promise<ConversationEntity> {
        return this.conversationRepository.deleteConversation(conversationId)
    }

    async findConversations(memberId: string): Promise<ConversationEntity[]> {
        return this.conversationRepository.findConversations(memberId)
    }
}