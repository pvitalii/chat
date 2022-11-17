export interface IHashService {
    hashPassword(password: string): Promise<string>;
    comparePasswords(hashedPassword: string, psasword: string): Promise<boolean>;
}