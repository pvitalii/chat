import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../axios/user-api";

export const addContact = createAsyncThunk(
    'user/add-contact',
    async function(payload: {userId: string, contactId: string}) {
        const response = await userApi.addContact(payload.userId, payload.contactId);
        return response.contacts
    }
)