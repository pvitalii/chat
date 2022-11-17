import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";
import { addContact } from "../user/user.thunks";
import { getUser, signin, signout, signup } from "./auth.thunks";

const userAdapter = createEntityAdapter<User>({
    selectId: user => user.id,


})

const authSlice = createSlice<{isAuth: boolean, currentUser: User, error: string}, {}, string>({
    name: 'auth',
    initialState: {
        isAuth: false,
        currentUser: {} as User,
        error: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, { payload }) => {
            state.isAuth = true;
            state.error = '';
        })
        builder.addCase(signin.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            } else {
                state.error = action.error.code as string
            }
        })

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        })

        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.isAuth = true;
            state.error = '';
        })
        builder.addCase(signup.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            } else {
                state.error = action.error.code as string
            }
        })

        builder.addCase(signout.fulfilled, (state) => {
            state.isAuth = false;
            state.currentUser = {} as User
        })

        builder.addCase(addContact.fulfilled, (state, action) => {
            state.currentUser.contacts = action.payload;
        })
    }
})

export default authSlice.reducer;