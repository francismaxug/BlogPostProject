import { IAppContext, IAppService } from "../types/app"
import { IUser } from "../types/user"
import createError from "../utils/appError"

export class UserServices extends IAppService {
  constructor(context: IAppContext) {
    super(context)
  }

  createUser = async (input: IUser) => {
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

  login = async (input: IUser) => {
    try {
      const user = await this.queryDB.user.findOne({
        email: input.email
      })

      if (!user) throw createError("Invalid Credentials", 404)
      const checkPassword = await user.comparePasswords(input.password)
      if (!checkPassword) throw createError("Invalid Credentials", 404)

      //token here

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
