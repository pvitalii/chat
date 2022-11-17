import { model, Schema } from "mongoose";
import { MessageEntity } from "../../../../domain/entities/message.entity";

const Message = new Schema<MessageEntity>({
    text: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,

    },
    conversationId: {
        type: String,
        required: true,
    }

},
    {timestamps: true}
);

const MessageModel = model('Messages', Message);

export default MessageModel;
