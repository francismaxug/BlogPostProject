// Desc: This file is used to seed the database with sample data
import dotenv from "dotenv"
dotenv.config()
import UserAdmin from "./models/userModel"
import admin from "./data/admins"
import connectDB from "./models/serve"
import { config } from "./config/serve"

connectDB(config.dbString)
const importData = async () => {
  try {
    await UserAdmin.deleteMany()
    await UserAdmin.insertMany(admin)

    console.log("Data imported successfully")
  } catch (error) {
    console.log(`${(error as Error).message}`)
  }
  process.exit()
}

const destroyData = async () => {
  try {
    await UserAdmin.deleteMany()
    console.log("Data destroyed successfully")
  } catch (error) {
    console.log(`${(error as Error).message}`)
  }
  process.exit()
}

if (process.argv[2] === "--destroyData") {
  destroyData()
} else if (process.argv[2] === "--importData") {
  importData()
}
