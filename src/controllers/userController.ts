import { ReqBody } from "../interfaces/body"
import { IAppContext } from "../types/app"
import createError from "../utils/appError"
import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/appValidation"
import { ICreateUser, IUserLogin } from "../types/user"

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext
  }
}

//-----------------login admin----------------------
const userLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
      return next(createError("Please provide email and password", 400))
    }

    const { error } = userLoginValidator({ email, password })
    console.log(error)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError(errorInputs, 400))
    }

    const user = await req.context.services?.user.login({
      email,
      password,
      res
    } as IUserLogin)

    // console.log(user)

    return res.status(200).json(user)
  }
)

//-------create a User--------

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    if (!email || !name) {
      return next(createError("Please provide email and password", 400))
    }

    const { error } = userRegisterValidator(req.body)
    console.log(error)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError(errorInputs, 400))
    }

    const user = await req.context.services?.user.createUser({
      ...req.body,
      res
    } as ICreateUser)

    // console.log(user)
    return res.status(200).json(user)
  }
)

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(0)
    })
    res.status(200).json({
      status: "success",
      message: "Logout Successful"
    })
  } catch (error) {
    next(error)
  }
}

//----------complete registration of admin----------------------

//-------get admin profile info for update----------------------

//----------update profile of admin----------------------

export { userLogin, createUser, logout }
