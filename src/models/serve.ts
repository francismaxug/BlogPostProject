import mongoose from "mongoose"
import dotenv from "dotenv"
import { Config } from "../config/serve"
import { IInitDB } from "./initalize"
import User from "./userModel"
import Comment from "./commentModel"
import Blog from "./blogModel"
dotenv.config()
let connected = false
const connectDB = async (db: Config["dbString"]): Promise<IInitDB> => {
  try {
    await mongoose.connect(db.uri || "")
    connected = true

    //------------create collections-------------
    await User.createCollection()
    await Comment.createCollection()
    await Blog.createCollection()
    console.log(`MongoDB Connected`)

    return {
      user: User,
      comment: Comment,
      blog: Blog
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    process.exit(1)
  }
}

export default connectDB
