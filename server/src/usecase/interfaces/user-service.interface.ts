import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserPayload } from "../../domain/interfaces/payload/user/create-user-payload";

export interface IUserService {
    createUser(payload: CreateUserPayload): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    getUserByEmail(email: string): Promise<UserEntity>;
    getUserById(userId: string): Promise<UserEntity>;
    addContact(userId: string, contactId: string): Promise<Pick<UserEntity, 'contacts'>>;
}