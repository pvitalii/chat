import { $axios } from ".";
import { CreateMessagePayload } from "../interfaces/create-message-payload";
import { IMessage } from "../interfaces/message.interface";

class MessageApi {
    async createMessage(payload: CreateMessagePayload): Promise<IMessage> {
        const { data } = await $axios.post('message/create-message', payload)
        return data
    }

    async editMessage(messageId: string, text: string): Promise<IMessage>  {
        const { data } = await $axios.put('message/edit-message')
        return data
    }

    async deleteMessage(messageId: string): Promise<IMessage> {
        const { data } = await $axios.delete(`message/delete-message/${messageId}`)
        return data
    }

    async getMessagesOfConversation(conversationId: string): Promise<IMessage[]> {
        const { data } = await $axios.get(`message/get-messages-of-chat/${conversationId}`)
        return data
    }
}

export default new MessageApi();