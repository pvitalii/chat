import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";
import { IUserService } from "../../usecase/interfaces/user-service.interface";
import { IsUnique } from "../validation-decorators/is-unique.decorator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}