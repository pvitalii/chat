import { createAsyncThunk } from "@reduxjs/toolkit";
import conversationsApi from "../../axios/conversation-api";
import { Conversation } from "../../interfaces/conversations.interface";

export const createChat = createAsyncThunk(
    'chat/create-chat',
    async function (members: {firstUserId: string, secondUserId: string}) {
        const chat = await conversationsApi.createConversation(members.firstUserId, members.secondUserId);
        return chat;
    }

)

export const findChats = createAsyncThunk<Conversation[], string>(
    'chat/get-chats',
    async function (memberId) {
        const chats = await conversationsApi.findConversations(memberId);
        return chats;
    }
)