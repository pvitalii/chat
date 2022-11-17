import { ConversationEntity } from "../../entities/conversation.entity";

export interface IConversationRepository {
    createConversation(members: string[]): Promise<ConversationEntity>;
    deleteConversation(conversationId: string): Promise<ConversationEntity>;
    findConversations(memberId: string): Promise<ConversationEntity[]>
}