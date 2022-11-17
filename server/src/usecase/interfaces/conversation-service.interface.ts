import { ConversationEntity } from "../../domain/entities/conversation.entity";

export interface IConversationService {
    createConversation(members: string[]): Promise<ConversationEntity>;
    deleteConversation(conversationId: string): Promise<ConversationEntity>;
    findConversations(memberId: string): Promise<ConversationEntity[]>;
}