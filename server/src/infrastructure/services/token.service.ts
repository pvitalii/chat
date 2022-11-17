import { Tokens } from "../../usecase/interfaces/tokens.interface";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ITokenService } from "../interfaces/token-service.interface";
import jwt from "jsonwebtoken"

export class TokenService implements ITokenService {
    private accessTokenOptions: jwt.SignOptions = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
    }

    private refreshTokenOptions: jwt.SignOptions = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!,
    }

    private secretKeys = {
        AccessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
        RefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
    }

    async generateToken(payload: JwtPayload, secret: string, JwtSignOptions: jwt.SignOptions): Promise<string> {
        return jwt.sign(payload, secret, JwtSignOptions)
    }

    async generateAccessToken(payload: JwtPayload): Promise<string> {
        return this.generateToken(payload, this.secretKeys.AccessTokenSecret, this.accessTokenOptions)
    }

    async generateRefreshToken(payload: JwtPayload): Promise<string> {
        return this.generateToken(payload, this.secretKeys.RefreshTokenSecret, this.refreshTokenOptions)
    }

    async generateTokenPair(payload: JwtPayload): Promise<Tokens> {
        return {
            accessToken: await this.generateAccessToken(payload),
            refreshToken: await this.generateRefreshToken(payload),
        }
    }
}