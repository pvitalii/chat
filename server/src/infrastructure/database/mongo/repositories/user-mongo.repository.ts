import { UserEntity } from "../../../../domain/entities/user.entity";
import { CreateUserPayload } from "../../../../domain/interfaces/payload/user/create-user-payload";
import { IUserRepository } from "../../../../domain/interfaces/repositories/user-repository.interface";
import UserModel from "../models/user";

export class UserMongoRepository implements IUserRepository {
    async createUser(payload: CreateUserPayload) {
        const newUser = new UserModel({email: payload.email, password: payload.password})
        return newUser.save()
    }

    async getAllUsers() {
        return UserModel.find()
    }

    async getUserbyEmail(email: string): Promise<UserEntity> {
        
        return UserModel.findOne({ email })
    }

    async getUserById(userId: string): Promise<UserEntity> {
        return UserModel.findById(userId)
    }

    async addContact(userId: string, contactId: string): Promise<Pick<UserEntity, "contacts">> {
        const user = await UserModel.findById(userId);
        user.contacts.push(contactId);
        user.save()
        return {contacts: user.contacts}
    }
}