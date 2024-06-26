import { Response } from "express"
import jwt from "jsonwebtoken"
const generateToken = (user:{_id:string}, res:Response) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRESIN as string
  })
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRESIN as string)) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "none"
    // maxAge: 30 * 24 * 60 * 60 * 1000
  })
  return
}

export default generateToken
