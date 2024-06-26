import { IAppContext, IAppService } from "../types/app"
import { IComment, ICretaeComment } from "../types/comment"
import createError from "../utils/appError"

export class CommentServices extends IAppService {
  constructor(context: IAppContext) {
    super(context)
  }

  createComment = async (input: ICretaeComment) => {
    try {
      console.log("seen")
      const newComment = await this.queryDB.comment.create(input)

      return {
        message: "Comment created successfully",
        comment: newComment
      }
    } catch (err) {
      throw err
    }
  }

  getCommentsByPost = async (postId: string, page: number, limit: number) => {
    try {
      const totalComments = await this.queryDB.comment.countDocuments({
        post: postId
      }) // Count total comments for this post
      const comments = await this.queryDB.comment
        .find({ post: postId })
        .populate("author")
        .skip((page - 1) * limit) // Calculate skip value
        .limit(limit) // Limit the number of comments
        .sort({ createdAt: -1 })

      return {
        comments,
        totalPages: Math.ceil(totalComments / limit), // Calculate total pages
        currentPage: page
      }
    } catch (err) {
      throw err
    }
  }

  deleteComment = async (commentId: string) => {
    try {
      const comment = await this.queryDB.comment.findByIdAndDelete(commentId)
      if (!comment) {
        throw createError("Comment not found", 404)
      }

      return {
        message: "Comment deleted successfully",
        deletedComment:comment
      }
    } catch (err) {
      throw err
    }
  }
}
