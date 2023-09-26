import { Document } from "mongoose"
import {authUser} from "./user"

export interface ITodo extends Document {
    name: string
    description: string
    status: boolean
}

export interface RequestTodo  {
    name: string
    description: string
    user:authUser

}