import { IInitDB } from "../models/initalize"
import { IServices } from "../services/serve"

export interface IAppContext {
  queryDB?: IInitDB
  services?: IServices
}
export class IAppService {
  queryDB: IInitDB
  constructor(query: IAppContext) {
    this.queryDB = query.queryDB!
  }
}
