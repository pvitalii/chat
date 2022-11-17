import { Request, Response } from "express";
import { IUserService } from "../../usecase/interfaces/user-service.interface";
import { serialize } from "../serializers/serialize";
import { SingleUserSerializer } from "../serializers/user/single-user.serializer";

export class UserController {
    constructor(private userService: IUserService) { }

    async createUser(req: Request, res: Response) {
        const {email, password} = req.body;
        const user = await this.userService.createUser({email, password})
        return res.status(200).json(serialize(SingleUserSerializer, { user }))
    }

    async getAllUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        return res.json(users)
    }

    async getUserById(req: Request, res: Response) {
        const { userId } = req.params;
        const user = await this.userService.getUserById(userId);
        return res.status(200).json(serialize(SingleUserSerializer, { user }).user)
    }

    async addContact(req: Request, res: Response) {
        const { userId, contactId } = req.body;
        const newContacts = await this.userService.addContact(userId, contactId);
        return res.status(200).json(newContacts)
    }
}