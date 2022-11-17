import { config } from "process";
import { $axios } from ".";
import { Conversation } from "../interfaces/conversations.interface";

class ConversationApi {
    async createConversation(firstUserId: string, secondUserId: string): Promise<Conversation> {
        const { data } = await $axios.post('chat/create-chat', { firstUserId, secondUserId });
        return data
    }

    async deleteConversation(conversationId: string): Promise<Conversation> {
        const { data } = await $axios.delete(`chat/delete-chat/${conversationId}`);
        return data
    }

    async findConversations(memberId: string): Promise<Conversation[]> {
        const { data } = await $axios.get(`chat/get-chats/${memberId}`);
        return data
    }
}

export default new ConversationApi()