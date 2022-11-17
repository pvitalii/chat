import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IMessage } from "../../interfaces/message.interface";
import { getMessagesOfConversation } from "./messages.thunks";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [] as IMessage[]
    },
    reducers: {   
        setMess(state, action) {
            state.messages = action.payload

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessagesOfConversation.fulfilled, (state, action) => {
            state.messages = action.payload
        })
    }
})

export const { setMess } = messagesSlice.actions;
export default messagesSlice.reducer;