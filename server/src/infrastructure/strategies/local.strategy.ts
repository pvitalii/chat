import passport from "passport"
import passportLocal from "passport-local"
import { serialize } from "../../deliver/serializers/serialize";
import { SingleUserSerializer } from "../../deliver/serializers/user/single-user.serializer";
import { UserService } from "../../usecase/services/user.service";
import { UserMongoRepository } from "../database/mongo/repositories/user-mongo.repository";
import { HashService } from "../services/hash.service";

const LocalStrategy = passportLocal.Strategy;
const userService = new UserService(new UserMongoRepository());
const hashService = new HashService();

async function validateUser(email: string, password: string) {
    const user = await userService.getUserByEmail(email);
    if(!user) {
        return null
    }
    const isPasswordCorrect = await hashService.comparePasswords(user.password, password);
    if (isPasswordCorrect) {
        return user
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        const user = await validateUser(email, password);
        if(!user) {
            return done(null, false)
        }
        return done(null, serialize(SingleUserSerializer, { user }).user)
    })
)