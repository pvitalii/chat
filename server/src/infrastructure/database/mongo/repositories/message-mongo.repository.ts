import { MessageEntity } from "../../../../domain/entities/message.entity";
import { CreateMessagePayload } from "../../../../domain/interfaces/payload/message/create-message-payload";
import { EditMessagePayload } from "../../../../domain/interfaces/payload/message/edit-message-payload";
import { IMessageRepository } from "../../../../domain/interfaces/repositories/message-repository.interface";
import MessageModel from "../models/message";

export class MessageMongoRepository implements IMessageRepository {
    async createMessage(payload: CreateMessagePayload): Promise<MessageEntity> {
        const newMessage = new MessageModel(payload);
        return newMessage.save()
    }

    async editMessage(payload: EditMessagePayload): Promise<MessageEntity> {
        const messageToEdit = await MessageModel.findByIdAndUpdate(payload.messageId, {text: payload.text})
        return messageToEdit as MessageEntity
    }

    async deleteMessage(messageId: string): Promise<MessageEntity> {
        const messageToDelete = await MessageModel.findByIdAndDelete(messageId);
        return messageToDelete as MessageEntity
    }

    async getMessagesOfConversation(conversationId: string): Promise<MessageEntity[]> {
        const messages = await MessageModel.find({conversationId});
        return messages
    }

}