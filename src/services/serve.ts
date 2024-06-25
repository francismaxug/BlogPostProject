import { UserServices } from "./user"
import { BlogServices } from "./blog"
import { CommentServices } from "./comment"
import { IAppContext } from "../types/app"

export interface IServices {
  user: UserServices
  blog: BlogServices
  comment: CommentServices
}

export const startServices = async (query: IAppContext) => {
  try {
    const user = new UserServices(query)
    const blog = new BlogServices(query)
    const comment = new CommentServices(query)
    return { user, blog, comment }
  } catch (error) {
    throw error
  }
}
