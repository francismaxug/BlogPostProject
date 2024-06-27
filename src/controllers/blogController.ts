import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { blogValidator } from "../validators/appValidation"
import createError from "../utils/appError"

interface QueryString {
  [key: string]: string | string[] | undefined // Allow any string key-value pair
}

//-------create a Blog--------
const createBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body

     //------get user_id from middleware---------
    const author = req.user?._id

    const { error } = blogValidator(req.body)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError(errorInputs, 400))
    }

    const blog = await req.context.services?.blog.createBlog({
      title,
      content,
      author
    })

    // console.log(blog)
    return res.status(200).json(blog)
  }
)

//------------Get a blog--------------
const getAblogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id
    const blog = await req.context.services?.blog.getBlog(blogId)

    // console.log(blog)
    return res.status(200).json(blog)
  }
)

//---get all user blog post----------------

const getAllMyBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

     //------get user_id from middleware---------
    const userId = req.user?._id

    const allBlogs = await req.context.services?.blog.getMyBlogs(
      req.query as QueryString,
      userId.toString()
    )

    // console.log(allBlogs)
    return res.status(200).json(allBlogs)
  }
)

//-----Get-all-blog-Post-----------------
const getAllBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allBlogs = await req.context.services?.blog.getAllBlogs(
      req.query as QueryString
    )

    // console.log(allBlogs)
    return res.status(200).json(allBlogs)
  }
)

//---update-blogPost------------
const updateBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id
    const { title, content } = req.body

     //------get user_id from middleware---------
    const author = req.user?._id

    //---update blog---------------
    const updatedBlog = await req.context.services?.blog.updateBlog(
      blogId,
      author.toString(),
      {
        title,
        content,
        author
      }
    )

    // console.log(updatedBlog)
    return res.status(200).json(updatedBlog)
  }
)

//------delete blog--------------
const deleteBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id

    //------get user_id from middleware---------
    const author = req.user?._id

    //---update blog---------------
    const deleteBlgMessage = await req.context.services?.blog.deleteBlog(
      blogId,
      author.toString()
    )

    // console.log(deleteBlgMessage)
    return res.status(200).json(deleteBlgMessage)
  }
)

export {
  createBlogPost,
  getAblogPost,
  getAllBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllMyBlogPost
}
