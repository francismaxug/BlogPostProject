import { IAppContext, IAppService } from "../types/app"
import { IComment, ICretaeComment } from "../types/comment"
import createError from "../utils/appError"
import HandlePaginate from "../utils/handlePaginate"

interface QueryString {
  [key: string]: string | string[] | undefined // Allow any string key-value pair
}
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

  getCommentsByPost = async (queryString: QueryString, postId: string) => {
    try {
      const query = this.queryDB.comment
        .find({ post: postId })
        .populate("author")

      const handlePaginate = new HandlePaginate(
        query,
        queryString 
      )
        .filter()
        .sort()
        .limitFields()
        .paginate()

      const comments = await handlePaginate.query

      const totalComments = comments.length
      const totalPages = Math.ceil(
        totalComments === 0
          ? 0
          : totalComments / (Number(queryString.limit) || handlePaginate.limit)
      )
      const currentPage = Number(queryString?.page) || handlePaginate.page
      return {
        comments,
        totalPages,
        currentPage
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
        deletedComment: comment
      }
    } catch (err) {
      throw err
    }
  }
}
