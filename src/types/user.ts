import { Document } from "mongoose"

export interface IUser extends Document {
    name: string
    email: string
    password: string
}

export interface authUser {
    id: string,
    iat: number
}