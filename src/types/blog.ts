import { Document, Types, Model } from "mongoose"

export interface IBlog {
  title: string
  content: string
  author: Types.ObjectId
}

export interface IBlogSchema extends IBlog, Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface IBlogCreatedResponse {
  message: string
  blog: IBlogSchema
}

export interface IBlogModel extends Model<IBlogSchema> {}
