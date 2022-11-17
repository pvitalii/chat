import { Router } from "express";
import { IUserRepository } from "../../domain/interfaces/repositories/user-repository.interface";
import { UserService } from "../../usecase/services/user.service";
import { UserController } from "../controllers/user.controller";

export function userRouter(userRepository: IUserRepository) {

    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const UserRouter = Router();

    UserRouter.post('/create-user', userController.createUser.bind(userController));
    UserRouter.get('/get-users', userController.getAllUsers.bind(userController));
    UserRouter.get('/get-user-by-id/:userId', userController.getUserById.bind(userController));
    UserRouter.put('/add-contact', userController.addContact.bind(userController));

    return UserRouter
}
