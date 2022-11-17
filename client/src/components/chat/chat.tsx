import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./chat.scss"
import dotsBtn from "../../assets/menu.png"
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import sendIcon from "../../assets/send.png"
import { getMessagesOfConversation } from "../../store/messages/messages.thunks";
import { User } from "../../interfaces/user.interface";
import { InterlocutorContext } from "../chats/chats";
import userApi from "../../axios/user-api";
import { socket } from "../..";
import messageApi from "../../axios/message-api";
import { IMessage } from "../../interfaces/message.interface";
import Message from "../message/message";

function Chat() {
    const { chatId } = useParams();

    const currUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useAppDispatch();
    // const messages = useSelector((state: RootState) => state.message.messages);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([] as IMessage[]);

    const [arrivalMessage, setArrivalMessage] = useState('' as any);

    const scrollRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const interlocutorId = useContext(InterlocutorContext).intId;
    const [interlocutor, setInterlocutor] = useState({} as User)


    const getUserById = async (userId: string) => {
        return userApi.getUserById(userId)
    }

    useEffect(() => {
        const fetchMessages = async () => {
            setMessages(await messageApi.getMessagesOfConversation(chatId!))
        }
        fetchMessages()
        
        const setInt = async () => {
            setInterlocutor(await getUserById(interlocutorId ? interlocutorId : localStorage.getItem('interlocutor') || ''))
        }
        setInt()
        
    }, [chatId])

    useEffect(() => {
        socket.on('get-message', (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })

        })

        setMessages([...messages, arrivalMessage])
        // console.log(arrivalMessage)

    },[arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (message: string) => {
        const m = await messageApi.createMessage({
            senderId: currUser.id,
            text: message,
            conversationId: chatId!,
        })
        socket.emit('send-message', {
            ...m,
            receiverId: interlocutorId,
        })
    }

    return (
        <div className="opened-chat">
            <div className="chat-header">
                <img className="user-avatar" src={interlocutor.picture} alt="avatar" />
                <span>{interlocutor.name}</span>
                <button className="dots-btn"><img className="dots-img" src={dotsBtn} alt="dots" /></button>

            </div>
            <div className="messages-field">
                {
                    messages.map((mes) => (
                        <div ref={scrollRef}>
                            <Message  key={mes._id} message={mes} own={mes.senderId === currUser.id}></Message>
                        </div>
                        
                    ))
                }
            </div>
            <div className="sender">
                <input type="text" placeholder="Message" onChange={(e) => setMessageText(e.target.value)}/>
                <button className="send-btn" onClick={() => sendMessage(messageText)}><img className="send-icon" src={sendIcon} alt="send" /></button>
            </div>
        </div>
    )
}

export default Chat;