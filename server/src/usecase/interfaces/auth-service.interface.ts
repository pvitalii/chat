import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserPayload } from "../../domain/interfaces/payload/user/create-user-payload";
import { Tokens } from "./tokens.interface"

export interface IAuthService {
    signup(credentials: CreateUserPayload): Promise<Tokens>;
    signin(user: Omit<UserEntity, 'password'>): Promise<Tokens>;
}