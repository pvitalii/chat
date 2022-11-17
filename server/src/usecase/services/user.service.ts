import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserPayload } from "../../domain/interfaces/payload/user/create-user-payload";
import { IUserRepository } from "../../domain/interfaces/repositories/user-repository.interface";
import { IUserService } from "../interfaces/user-service.interface";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }

    async createUser(payload: CreateUserPayload): Promise<UserEntity> {
        return this.userRepository.createUser(payload)
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.getAllUsers()
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.getUserbyEmail(email)
    }

    async getUserById(userId: string): Promise<UserEntity> {
        return this.userRepository.getUserById(userId)
    }

    async addContact(userId: string,contactId: string): Promise<Pick<UserEntity, 'contacts'>> {
        return this.userRepository.addContact(userId, contactId)
    }
}