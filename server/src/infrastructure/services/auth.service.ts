import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserPayload } from "../../domain/interfaces/payload/user/create-user-payload";
import { IAuthService } from "../../usecase/interfaces/auth-service.interface";
import { Tokens } from "../../usecase/interfaces/tokens.interface";
import { IUserService } from "../../usecase/interfaces/user-service.interface";
import { UserService } from "../../usecase/services/user.service";
import { UserMongoRepository } from "../database/mongo/repositories/user-mongo.repository";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { HashService } from "./hash.service";
import { TokenService } from "./token.service";

class AuthService implements IAuthService {
    constructor(
        private userService: IUserService,
        private hashService: HashService,
        private tokenService: TokenService,
    ) { }

    async signup(credentials: CreateUserPayload): Promise<Tokens> {
        const user = await this.userService.createUser({
            email: credentials.email,
            password: await this.hashService.hashPassword(credentials.password)
        });
        const payload: JwtPayload = {
            sub: user.id,
            name: user.email,
        }
        return this.tokenService.generateTokenPair(payload)

    }

    async signin(user: Omit<UserEntity, "password">): Promise<Tokens> {
        const payload: JwtPayload = {
            sub: user.id,
            name: user.email,
        }
        return this.tokenService.generateTokenPair(payload)
    }
}

export const authService = new AuthService(
    new UserService(new UserMongoRepository()),
    new HashService(),
    new TokenService(),
);