import * as express from "express-serve-static-core"
import { IAppContext } from "./src/types/app"

declare global {
  namespace Express {
    interface Request {
      context?: IAppContext
    }
  }
}
