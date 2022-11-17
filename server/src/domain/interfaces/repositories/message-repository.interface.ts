import { MessageEntity } from "../../entities/message.entity";
import { CreateMessagePayload } from "../payload/message/create-message-payload";
import { EditMessagePayload } from "../payload/message/edit-message-payload";

export interface IMessageRepository {
    createMessage(payload: CreateMessagePayload): Promise<MessageEntity>;
    editMessage(payload: EditMessagePayload): Promise<MessageEntity>;
    deleteMessage(messageId: string): Promise<MessageEntity>;
    getMessagesOfConversation(conversationId: string): Promise<MessageEntity[]>
}