import { Expose, Type } from "class-transformer";
import { SerializedUser } from "./user.serializer";

export class SingleUserSerializer {
    @Type(() => SerializedUser)
    @Expose()
    user: SerializedUser;
}