import { model, models, Schema } from "mongoose"
import { IBlogModel, IBlogSchema } from "../types/blog"

const blogSchema: Schema = new Schema<IBlogSchema>({
  title: { type: String, required: [true, "title is a required field"] },
  content: { type: String, required: [true, "content is a required field"] },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
const Blog = models.Blog || model<IBlogSchema, IBlogModel>("Blog", blogSchema)

export default Blog
