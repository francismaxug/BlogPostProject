import { Response } from "express"
import { Document, Types, Model } from "mongoose"

export interface IUser {
  name: string
  email: string
  password: string
}
export interface IUserLogin {
  email: string
  password: string
  res: Response
}
export interface ICreateUser {
  name: string
  email: string
  password: string
  res: Response
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId
  comparePasswords: (password: string) => Promise<boolean>
  createdAt: Date
  updatedAt: Date
}

export interface IUserRegiesterResponse {
  message: string
  user: {
    _id: Types.ObjectId
    name: string
    email: string
  }
}

export interface IUserModel extends Model<IUserSchema> {}
