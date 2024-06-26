import { Request, Response } from "express"
import { IAppContext, IAppService } from "../types/app"
import { ICreateUser, IUser, IUserLogin } from "../types/user"
import createError from "../utils/appError"
import generateToken from "../utils/token"

export class UserServices extends IAppService {
  constructor(context: IAppContext) {
    super(context)
  }

  createUser = async (input: ICreateUser) => {
    try {
      //----check if useralready exist with email------

      const existingUser = await this.queryDB.user.findOne({
        email: input.email
      })
      if (existingUser) {
        throw createError("User already exists", 400)
      }

      const user = await this.queryDB.user.create(input)
      // token here
      generateToken({ _id: user._id.toString() }, input.res)

      //--return a response-----
      return {
        message: "User created successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      }
    } catch (err) {
      throw err
    }
  }

  login = async (input: IUserLogin) => {
    try {
      const user = await this.queryDB.user.findOne({
        email: input.email
      })

      //----check if user exist with email------
      if (!user) throw createError("Invalid Credentials", 404)
      const checkPassword = await user.comparePasswords(input.password)

      //------check if password is correct------
      if (!checkPassword) throw createError("Invalid Credentials", 404)

      //token here
      generateToken({ _id: user._id.toString() }, input.res)

      return {
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      }
    } catch (err) {
      throw err
    }
  }
}
