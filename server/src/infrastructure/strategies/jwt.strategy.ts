import { Request } from "express";
import passport from "passport";
import passportJwt, { ExtractJwt } from "passport-jwt";
import { serialize } from "../../deliver/serializers/serialize";
import { SingleUserSerializer } from "../../deliver/serializers/user/single-user.serializer";
import { UserService } from "../../usecase/services/user.service";
import { UserMongoRepository } from "../database/mongo/repositories/user-mongo.repository";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

const JwtStrategy = passportJwt.Strategy;

const cookieExtractor = function (req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.accessToken;
    }
    return token;
};

const userService = new UserService(new UserMongoRepository())

passport.use(
    new JwtStrategy({
        secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
        ignoreExpiration: false,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    }, async (payload: JwtPayload, done) => {
        const user = await userService.getUserByEmail(payload.name)
        return done(null, serialize(SingleUserSerializer, { user }).user)
    })
)