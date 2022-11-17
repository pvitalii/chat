import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth/auth.slice";
import conversationsSlice from "./conversations/conversations.slice";
import {
    persistStore, 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import messagesSlice from "./messages/messages.slice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['message'],
};

const appReducer = combineReducers({
    auth: authSlice,
    chat: conversationsSlice,
    message: messagesSlice,
});

const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === 'auth/signout/fulfilled') {
        storage.removeItem('persist:root')
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export default store;