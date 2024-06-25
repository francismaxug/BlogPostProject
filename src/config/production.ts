import dotenv from "dotenv"
import { Config } from "./serve"

dotenv.config()

export const prodConfig: Config = {
  initApp: {
    port: Number(process.env.PORT) || 8080,
    name: "Take Home Project",
    env: "production"
  },
  dbString: {
    uri: process.env.MONGO_URI!
  }
}
