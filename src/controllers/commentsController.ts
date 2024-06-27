import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { commentValidator } from "../validators/appValidation"
import createError from "../utils/appError"

interface QueryString {
  [key: string]: string | string[] | undefined // Allow any string key-value pair
}

//-------create a Comment--------

const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { comment } = req.body
    const author = req.user?._id
    const postId = req.params.postId

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

    // console.log(createdComment)
    return res.status(200).json(createdComment)
  }
)

//-----getCommentByPost----------------

const getCommentByPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId

    const getCommentbyPost =
      await req.context.services?.comment.getCommentsByPost(
        req.query as QueryString,
        postId
      )

    // console.log(getCommentByPost)
    return res.status(200).json(getCommentbyPost)
  }
)

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId
    const deleteComment = await req.context.services?.comment.deleteComment(
      commentId
    )
    return res.status(200).json(deleteComment)
  }
)

export { createComment, getCommentByPost, deleteComment }
