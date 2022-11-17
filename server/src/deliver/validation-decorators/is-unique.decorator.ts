import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { IUserService } from '../../usecase/interfaces/user-service.interface';

export function IsUnique(userService: IUserService, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsUnique',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const user = await userService.getUserByEmail(value);
                    return user ? false : true;
                },
                defaultMessage(ValidationArguments?: ValidationArguments) {
                    return 'Email must be unique';
                },
            },
        });
    };
}