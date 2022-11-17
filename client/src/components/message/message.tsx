import { format } from "timeago.js";
import "./message.scss"

interface MessageProps {
    message: {
        text: string;
        createdAt: string;
    };
    own: boolean;
}

function Message({message, own}: MessageProps) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message;