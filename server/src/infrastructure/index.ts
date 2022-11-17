import express from "express";
import "dotenv/config";
import "reflect-metadata";
import { config } from "./config";
import { mongoConnect } from "./database/mongo/mongo-connect";
import { userRouter } from "../deliver/routes/user.route";
import { UserMongoRepository } from "./database/mongo/repositories/user-mongo.repository";
import { WinstonLogger } from "./logger/winston-logger";
import { ILogger } from "./interfaces/logger.interface";
import { IUserRepository } from "../domain/interfaces/repositories/user-repository.interface";
import { IMessageRepository } from "../domain/interfaces/repositories/message-repository.interface";
import { MessageMongoRepository } from "./database/mongo/repositories/message-mongo.repository";
import { IConversationRepository } from "../domain/interfaces/repositories/conversation-repository.interface";
import { ConversationMongoRepository } from "./database/mongo/repositories/conversation-mongo.repository";
import { messageRouter } from "../deliver/routes/message.route";
import { conversationRouter } from "../deliver/routes/conversation.route";
import { authRouter } from "../deliver/routes/auth.route";
import { authService } from "./services/auth.service";
import "./strategies/local.strategy";
import "./strategies/jwt.strategy";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io"

class AppServer {
    private app = express();
    private logger: ILogger = new WinstonLogger();
    private httpServer = createServer(this.app);

    start() {
        this.initMiddlewares();
        this.initRoutes();
        this.initSocket();
        this.startListening();
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
        this.app.use(cookieParser());
    }

    private initRoutes() {
        const userRepository: IUserRepository = new UserMongoRepository();
        const messageRepository: IMessageRepository = new MessageMongoRepository();
        const conversationRepository: IConversationRepository = new ConversationMongoRepository();

        this.app.use('/user', userRouter(userRepository));
        this.app.use('/message', messageRouter(messageRepository));
        this.app.use('/chat', conversationRouter(conversationRepository));
        this.app.use('/auth', authRouter(authService))
    }

    private initSocket() {
        const io = new Server(this.httpServer, {
            cors: {
                origin: "http://localhost:3000"
            }
        });
        io.on("connection", (socket) => {
            socket.on('send-message', ({ senderId, text, receiverId, conversationId }) => {
                io.emit('get-message', {
                    senderId,
                    text,
                    receiverId
                })
            })

        });
    }

    private startListening() {
        const { port } = config;
        this.httpServer.listen(port, () => this.logger.log('info', `Server started on port ${port}`));
        mongoConnect().then(() => this.logger.log('info', 'database successfully connected')).catch((err) => this.logger.log('info', err));
    }
}

new AppServer().start();