import { Document, Types, Model } from "mongoose"

export interface IComment {
  comment: string
  author: Types.ObjectId
  post: Types.ObjectId
}

export interface ICommentSchema extends IComment, Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface ICommentCreatedResponse {
  message: string
  comment:ICommentSchema
}
export interface ICommentModel extends Model<ICommentSchema> {}
