import { Request, Response } from "express"
import { IAdminEditProfileInfo } from "../types/user"

export function sanitizePhone(phone: string) {
  if (phone.charAt(0) === "0") {
    const phoneCat = phone.slice(1)
    const phoneWithCode = "233" + phoneCat
    return phoneWithCode
  }

  return phone
}

export async function adminUpdateProfileResults(
  req: Request,
  res: Response,
  data: IAdminEditProfileInfo
) {
  const admin = await req.context?.services?.userAdmin.adminUpdateProfile(data)

  console.log(admin)
  return res.status(200).json({
    _id: req.user._id,
    role: req.user.role,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profileImage: admin?.profileImage,
    email: admin?.email,
    isSubmitFullDetails: req.user.isSubmitFullDetails
  })
}
