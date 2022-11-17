import { model, Schema } from "mongoose";
import { ConversationEntity } from "../../../../domain/entities/conversation.entity";

const Conversation = new Schema<ConversationEntity>({
    members: {
        type: [String],
        require: true,
    },
})

const ConversationModel = model('Conversations', Conversation)

export default ConversationModel;