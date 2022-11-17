import { UserEntity } from "../../entities/user.entity";
import { CreateUserPayload } from "../payload/user/create-user-payload";

export interface IUserRepository {
    createUser(payload: CreateUserPayload): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    getUserbyEmail(email: string): Promise<UserEntity>;
    getUserById(userId: string): Promise<UserEntity>;
    addContact(userId: string, contactId: string): Promise<Pick<UserEntity, 'contacts'>>;
    // changeAvatar(avatarUrl: string): Promise<UserEntity>; 
}