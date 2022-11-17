import { Router } from "express";
import passport from "passport";
import { IAuthService } from "../../usecase/interfaces/auth-service.interface";
import { AuthController } from "../controllers/auth.controller";
import { CreateUserDto } from "../dto/create-user.dto";
import { validate } from "../middleware/validate";

export function authRouter(authService: IAuthService) {
    const authController = new AuthController(authService);

    const AuthRouter = Router();

    AuthRouter.post('/signup', validate(CreateUserDto), authController.signup.bind(authController));
    AuthRouter.post('/signin', passport.authenticate('local', {session: false}), authController.signin.bind(authController));
    AuthRouter.delete('/signout', authController.signout.bind(authController));
    AuthRouter.get('/get-user', passport.authenticate('jwt', { session: false }), authController.getUser.bind(authController))

    return AuthRouter
}