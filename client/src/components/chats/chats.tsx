import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Conversation } from "../../interfaces/conversations.interface";
import { User } from "../../interfaces/user.interface";
import { RootState, useAppDispatch } from "../../store";
import { findChats } from "../../store/conversations/conversations.thunks";
import ChatBox from "../chat-box/chat-box";
import "./chats.scss"

export const InterlocutorContext = React.createContext({} as { intId: string, changeId: (v: string) => void });

function Chats() {

    const [intId, setIntId] = useState('');
    const changeId = (value: string) => {
        setIntId(value);
    };

    const user = useSelector((state: RootState) => state.auth.currentUser);
    const chats = useSelector((state: RootState) => state.chat.chats);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(findChats(user.id))
    }, [])


    return (
        <InterlocutorContext.Provider value={{ intId, changeId }}>

            <div className="chats-page">
                <div className="chats-menu">
                    <div className="header">
                        <h1>Chats</h1>
                        <button className="create-chat-btn">Create New Chat</button>
                    </div>
                    <div className="search-field">
                        <input type="text" placeholder="Search" />
                        <select name="search-option" id="">
                            <option value="Messages">Messages</option>
                            <option value="Chats">Chats</option>
                        </select>
                    </div>
                    <div className="chat-list">
                        {chats.map((chat: Conversation) => (
                            <ChatBox key={chat._id} chat={chat}></ChatBox>
                        ))}
                    </div>
                </div>

            </div>
            <Outlet></Outlet>
            
        </InterlocutorContext.Provider>
    )
}

export default Chats;