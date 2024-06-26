import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { commentValidator } from "../validators/appValidation"
import createError from "../utils/appError"
import Comment from "../models/commentModel"

//-------create a Comment--------


const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    const { comment } = req.body
    console.log(comment)
    const author = req.user?._id
    const postId = req.params.postId
    console.log(author, postId)

    const { error } = commentValidator(req.body)
    console.log(error)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError(errorInputs, 400))
    }

    console.log("see it")

    const createdComment = await req.context.services?.comment.createComment({
      comment,
      author,
      post: postId
    })

    console.log(createdComment)
    return res.status(200).json(createdComment)
  }
)

//-----getCommentByPost----------------

const getCommentByPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const getCommentbyPost =
      await req.context.services?.comment.getCommentsByPost(postId, page, limit)

    console.log(getCommentByPost)
    return res.status(200).json(getCommentbyPost)
  }
)

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId
    const deleteComment = await req.context.services?.comment.deleteComment(commentId)
    return res.status(200).json(deleteComment)
  }

)

export { createComment, getCommentByPost, deleteComment }
