import { MessageEntity } from "../../domain/entities/message.entity";
import { CreateMessagePayload } from "../../domain/interfaces/payload/message/create-message-payload";
import { EditMessagePayload } from "../../domain/interfaces/payload/message/edit-message-payload";
import { IMessageRepository } from "../../domain/interfaces/repositories/message-repository.interface";
import { IMessageService } from "../interfaces/message-service.interface";

export class MessageService implements IMessageService {
    constructor(private messageRepository: IMessageRepository) { }

    async createMessage(payload: CreateMessagePayload): Promise<MessageEntity> {
        return this.messageRepository.createMessage(payload)
    }

    async editMessage(payload: EditMessagePayload): Promise<MessageEntity> {
        return this.messageRepository.editMessage(payload)
    }
    
    async deleteMessage(messageId: string): Promise<MessageEntity> {
        return this.messageRepository.deleteMessage(messageId)
    }

    async getMessagesOfConversation(conversationId: string): Promise<MessageEntity[]> {
        return this.messageRepository.getMessagesOfConversation(conversationId)
    }

}