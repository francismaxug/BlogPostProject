import dotenv from "dotenv"
import { Config } from "./serve"
dotenv.config()
export const devConfig:Config = {
  initApp: {
    port: Number(process.env.PORT) || 8080,
    name: "Take Home Project",
    env: "development"
  },
  dbString: {
    uri: process.env.MONGO_URI! 
  }
}
