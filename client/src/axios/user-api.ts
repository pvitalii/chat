import { $axios } from ".";
import { User } from "../interfaces/user.interface";

class UserApi {
    async getUserById(userId: string): Promise<User> {
        const { data } = await $axios.get(`user/get-user-by-id/${userId}`);
        return data
    }

    async addContact(userId: string, contactId: string): Promise<Pick<User, 'contacts'>> {
        const { data } = await $axios.put('user/add-contact', {userId, contactId});
        return data
    }
}

export default new UserApi();