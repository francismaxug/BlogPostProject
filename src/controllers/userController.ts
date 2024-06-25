import { ReqBody } from "../interfaces/body"
import { IAppContext } from "../types/app"
import createError from "../utils/appError"
import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"
import {
  validateAdmin,
} from "../validators/appValidation"

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext
  }
}

//-----------------login admin----------------------
const adminLogin = catchAsync(
  async (req: Request<{}, {}, ReqBody>, res: Response, next: NextFunction) => {
    const { adminID, password } = req.body

    if (!adminID || !password) {
      return next(createError("Please provide email and password", 400))
    }

    const { error } = validateAdmin({ adminID, password })
    console.log(error)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError("Invalid Credentials", 400))
    }
    const admin = await req.context.services?.userAdmin.login({
      adminID,
      password
    })

    return res.status(200).json(admin)
  }
)

//----------complete registration of admin----------------------



//-------get admin profile info for update----------------------


//----------update profile of admin----------------------




export {
  adminLogin,


}
