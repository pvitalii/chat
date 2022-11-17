import { $axios } from ".";
import { Credentials } from "../interfaces/credentials.interface";
import { Tokens } from "../interfaces/tokens.interface";
import { User } from "../interfaces/user.interface";


class AuthApi {
    async signup(credentials: Credentials): Promise<Tokens> {
        const { data } = await $axios.post('auth/signup', credentials, { withCredentials: true });
        return data
    }

    async signin(credentials: Credentials): Promise<Tokens> {
        const { data } = await $axios.post('auth/signin', credentials, { withCredentials: true });
        return data
    }

    async getUser(): Promise<User> {
        const { data } = await $axios.get('auth/get-user', { withCredentials: true });
        return data
    }

    async signout(): Promise<{message: string}> {
        const { data } = await $axios.delete('auth/signout', { withCredentials: true });
        return data
    }
}

export default new AuthApi()