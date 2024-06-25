import { model, models, Schema } from "mongoose"
import { ICommentModel, ICommentSchema } from "../types/comment"

const commentSchema: Schema = new Schema<ICommentSchema>({
  comment: { type: String, required: [true, "content is a required field"] },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  post: { type: Schema.Types.ObjectId, required: true, ref: "Blog" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
const Comment =
  models.Comment ||
  model<ICommentSchema, ICommentModel>("Comment", commentSchema)

export default Comment
