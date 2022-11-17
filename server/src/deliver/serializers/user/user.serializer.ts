import { Expose } from "class-transformer";

export class SerializedUser {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    name: string;

    @Expose()
    picture: string;

    @Expose()
    contacts: string[];

    password: string;
}