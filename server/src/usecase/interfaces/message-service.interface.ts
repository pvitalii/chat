import { MessageEntity } from "../../domain/entities/message.entity";
import { CreateMessagePayload } from "../../domain/interfaces/payload/message/create-message-payload";
import { EditMessagePayload } from "../../domain/interfaces/payload/message/edit-message-payload";

export interface IMessageService {
    createMessage(payload: CreateMessagePayload): Promise<MessageEntity>;
    editMessage(payload: EditMessagePayload): Promise<MessageEntity>;
    deleteMessage(messageId: string): Promise<MessageEntity>;
    getMessagesOfConversation(conversationId: string): Promise<MessageEntity[]>
}