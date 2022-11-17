import mongoose, { Mongoose } from "mongoose";
import { mongooseConfig } from "./mongo.config";

export function mongoConnect(): Promise<Mongoose> {
    return mongoose.connect(mongooseConfig.dbUrl)
}