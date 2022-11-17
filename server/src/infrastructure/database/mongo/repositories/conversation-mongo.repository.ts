import { ConversationEntity } from "../../../../domain/entities/conversation.entity";
import { IConversationRepository } from "../../../../domain/interfaces/repositories/conversation-repository.interface";
import ConversationModel from "../models/conversation";

export class ConversationMongoRepository implements IConversationRepository {
    async createConversation(members: string[]): Promise<ConversationEntity> {
        const newConversation = new ConversationModel({members});
        return newConversation.save()
    }
    async deleteConversation(conversationId: string): Promise<ConversationEntity> {
        const conversationToDelete = await ConversationModel.findByIdAndDelete(conversationId);
        return conversationToDelete as ConversationEntity
    }

    async findConversations(memberId: string): Promise<ConversationEntity[]> {
        return ConversationModel.find({members: memberId})
    }

}