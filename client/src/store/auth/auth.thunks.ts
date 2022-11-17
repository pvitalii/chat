import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../axios/auth-api";
import { Credentials } from "../../interfaces/credentials.interface";
import { Tokens } from "../../interfaces/tokens.interface";
import { User } from "../../interfaces/user.interface";

export const signin = createAsyncThunk<
    Tokens,
    Credentials,
    {
        rejectValue: string,
    }
>(
    'auth/signin',
    async function (credentials, { rejectWithValue }) {
        const tokens = await authApi.signin(credentials);
        return tokens
    }
)

export const getUser = createAsyncThunk<
    User
>(
    'auth/get-user',
    async function () {
        const user = await authApi.getUser();
        return user
    }
)

export const signout = createAsyncThunk(
    'auth/signout',
    async function () {
        authApi.signout()
    }
)

export const signup = createAsyncThunk<
    Tokens,
    Credentials,
    {
        rejectValue: string,
    }
>(
    'auth/signup',
    async function (credentials, { rejectWithValue }) {
        const tokens = await authApi.signup(credentials);
        return tokens
    }
)