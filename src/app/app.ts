import express from "express"
import { Request, Response, NextFunction } from "express-serve-static-core"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import connectDB from "../models/serve"
import handleError from "../middleware/customError"
import userRouter from "../routes/api/userRoute"
import cors from "cors"
import { Config } from "../config/serve"
import { IAppContext } from "../types/app"
import { startServices } from "../services/serve"
export const app = express()

export const startApp = async (config: Config) => {
  try {
    app.listen(config.initApp.port, () => {
      console.log(`Server is running on port ${config.initApp.port}`)
    })
    const appContext: IAppContext = {}
    appContext.queryDB = await connectDB(config.dbString)

    appContext.services = await startServices(appContext)

    // const corsOptions = {
    //   origin: "http://localhost:3000",
    //   credentials: true
    // }
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"))
    }
    app.use(cors())
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use((req: Request, res: Response, next: NextFunction) => {
      req.context = appContext
      next()
    })
    app.use("/api/v1/church", userRouter)
    app.use(handleError)

    //-----------------404 route----------------------
    app.all("*", (req, res) => {
      res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`
      })
    })
  } catch (error) {
    throw error
  }
}
