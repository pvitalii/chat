import { Tokens } from "../../usecase/interfaces/tokens.interface";
import { JwtPayload } from "./jwt-payload.interface";
import jwt from "jsonwebtoken"

export interface ITokenService {
    generateToken(payload: JwtPayload, secret: string, JwtSignOptions: jwt.SignOptions): Promise<string>;
    generateAccessToken(payload: JwtPayload): Promise<string>;
    generateRefreshToken(payload: JwtPayload): Promise<string>;
    generateTokenPair(accessTokenPayload: JwtPayload, refreshTokenPayload: JwtPayload): Promise<Tokens>;
}