import { createAsyncThunk } from "@reduxjs/toolkit";
import messageApi from "../../axios/message-api";
import { CreateMessagePayload } from "../../interfaces/create-message-payload";

export const createMessage = createAsyncThunk(
    'message/create-message',
    async function (payload: CreateMessagePayload) {
        return messageApi.createMessage(payload)
    }
)

export const getMessagesOfConversation = createAsyncThunk(
    'message/get-messages-of-chat',
    async function (conversationId: string) {
        return messageApi.getMessagesOfConversation(conversationId)
    }
)
