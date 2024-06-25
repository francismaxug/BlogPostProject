import { IBlogModel } from "../types/blog"
import { ICommentModel } from "../types/comment"
import { IUserModel, IUserSchema } from "../types/user"

export interface IInitDB {
  user: IUserModel
  blog: IBlogModel
  comment: ICommentModel
}
