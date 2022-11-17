import { createSlice } from "@reduxjs/toolkit";
import { Conversation } from "../../interfaces/conversations.interface";
import { findChats } from "./conversations.thunks";

const converstionsSlice = createSlice<{chats: Conversation[]}, {}, string>({
    name: 'conversations',
    initialState: {
        chats: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(findChats.fulfilled, (state, action) => {
            state.chats = action.payload;
        })
    }

})

export default converstionsSlice.reducer;
