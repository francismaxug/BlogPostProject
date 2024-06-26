import { Schema, model, models } from "mongoose"
import bcrypt from "bcryptjs"
import { IUserModel, IUserSchema } from "../types/user"

const userSchema = new Schema<IUserSchema>({
  name: { type: String, required: [true, "name is a required filed"] },
  email: {
    type: String,
    required: [true, "email is a required filed"],
    unique: true
  },
  password: { type: String, required: [true, "paassword is a required filed"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    const hashs = await bcrypt.hash(this.password, salt)
    this.password = hashs
    return
  } catch (error) {
    console.log(error)
  }
})

//compaere passwords
userSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

const User = models.User || model<IUserSchema, IUserModel>("User", userSchema)
export default User
