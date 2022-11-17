import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../axios/user-api";
import { Conversation } from "../../interfaces/conversations.interface";
import { IMessage } from "../../interfaces/message.interface";
import { User } from "../../interfaces/user.interface";
import { RootState } from "../../store";
import "../chats/chats.scss"
import messageApi from "../../axios/message-api";
import { InterlocutorContext } from "../chats/chats";
import { socket } from "../..";

function ChatBox({ chat }: { chat: Conversation }) {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [lastMessage, setLastMessage] = useState('')

    const interlocutorId = useContext(InterlocutorContext);
    const [intId, setIntId] = useState('');

    const [interlocutor, setInterlocutor] = useState({} as User);

    const getUserById = async (userId: string) => {
        return userApi.getUserById(userId)
    }

    useEffect(() => {
        const fetchMessages = async () => {
            const mess = await messageApi.getMessagesOfConversation(chat._id);
            setLastMessage(mess[mess.length - 1].text)
        }
        fetchMessages();
        chat.members
            .filter((id) => id !== user.id)
            .map((id) => {
                getUserById(id).then((value) => {
                    setInterlocutor(value)
                    setIntId(value.id)
                })
            });

    }, [])

    useEffect(() => {
        socket.on('get-message', (data) => {
            if (chat.members.includes(data.receiverId) && chat.members.includes(data.senderId)) {
                setLastMessage(data.text)
            }
        })
    }, [lastMessage])

    return (
        <div className="chat-box" onClick={() => {
            interlocutorId.changeId(intId);
            localStorage.setItem('interlocutor', intId)
            navigate(`/home/chats/${chat._id}`);
        }}>
            <div className="user">
                <img className="user-avatar" src={interlocutor.picture} alt="" />
                <span className="user-name">{interlocutor.name}</span>
            </div>
            <p>
                {
                    lastMessage.length > 90
                        ?
                        lastMessage.slice(0, 90) + "..."
                        :
                        lastMessage
                }
            </p>
        </div>
    )
}

export default ChatBox;