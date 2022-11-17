import { Request, Response } from "express";
import { UserEntity } from "../../domain/entities/user.entity";
import { IAuthService } from "../../usecase/interfaces/auth-service.interface";

export class AuthController {
    constructor(private authService: IAuthService) { }

    async signup(req: Request, res: Response) {
        const tokens = await this.authService.signup(req.body);
        res.cookie('accessToken', tokens.accessToken, {
            expires: new Date(Date.now() + 120000),
        });
        res.cookie('refreshToken', tokens.refreshToken, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return res.status(200).json(tokens)
    }

    async signin(req: Request, res: Response) {
        const tokens = await this.authService.signin(req.user as Omit<UserEntity, 'password'>);
        res.cookie('accessToken', tokens.accessToken, {
            expires: new Date(Date.now() + 120000),
        });
        res.cookie('refreshToken', tokens.refreshToken, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return res.status(200).json(tokens)
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({message: 'Successfull logout'});
    }

    async getUser(req: Request, res: Response) {
        return res.status(200).json(req.user)
    }
}