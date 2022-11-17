import { IHashService } from "../interfaces/hash-service.interface";
import * as argon2 from "argon2"

export class HashService implements IHashService {
    async hashPassword(password: string): Promise<string> {
        return argon2.hash(password)
    }

    async comparePasswords(hashedPassword: string, password: string): Promise<boolean> {
        return argon2.verify(hashedPassword, password)
    }
}