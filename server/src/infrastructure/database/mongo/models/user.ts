import { Schema, model } from 'mongoose';
import { UserEntity } from '../../../../domain/entities/user.entity';

const User = new Schema<UserEntity>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/8028/8028729.png"
    },
    name: {
        type: String,
        default: `User${Math.floor(Math.random() * 1000000000)}`,
        unique: true,
    },
    contacts: {
        type: [String],
        default: [],
    }
});

const UserModel = model('Users', User);

export default UserModel;