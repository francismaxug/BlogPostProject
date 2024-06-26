import { IAppContext, IAppService } from "../types/app"
import { IBlog } from "../types/blog"
import createError from "../utils/appError"
import HandlePaginate from "../utils/handlePaginate"

interface QueryString {
  [key: string]: string | string[] | undefined // Allow any string key-value pair
}
export class BlogServices extends IAppService {
  constructor(context: IAppContext) {
    super(context)
  }

  //---create a blog post------------
  createBlog = async (input: IBlog) => {
    try {
      const newBlog = await this.queryDB.blog.create(input)

      return {
        message: "Blog post created successfully",
        blog: newBlog
      }
    } catch (err) {
      throw err
    }
  }

  //---get a single blog post------------
  getBlog = async (blogId: string) => {
    try {
      const blog = await this.queryDB.blog.findById(blogId).populate("author")
      if (!blog) {
        throw createError("Blog post not found", 404)
      }

      return blog
    } catch (err) {
      throw err
    }
  }

  //---get-all blog-by-The --login-user---
  getMyBlogs = async (queryString: QueryString, userId: string) => {
    const query = this.queryDB.blog.find({ author: userId }).populate("author")
    // Create an instance of handlePaginate
    const handlePaginate = new HandlePaginate(query, queryString as QueryString)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const blogs = await handlePaginate.query

    const totalBlogs = blogs.length
    const totalPages = Math.ceil(
      totalBlogs === 0
        ? 0
        : totalBlogs / (Number(queryString.limit) || handlePaginate.limit)
    )
    const currentPage = Number(queryString?.page) || handlePaginate.page
    return {
      blogs,
      totalPages,
      currentPage
    }
  }

  //---get all blog posts------------

  getAllBlogs = async (queryString: QueryString) => {
    const query = this.queryDB.blog.find().populate("author")
    // Create an instance of APIFeatures
    const handlePaginate = new HandlePaginate(query, queryString as QueryString)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const blogs = await handlePaginate.query
    const totalBlogs = await this.queryDB.blog.countDocuments()

    const totalPages = Math.ceil(
      totalBlogs === 0
        ? 0
        : totalBlogs / (Number(queryString?.limit) || handlePaginate.limit)
    )
    const currentPage = Number(queryString?.page) || handlePaginate.page

    return {
      blogs,
      totalPages,
      currentPage
    }
  }

  //----update blog post--------------------

  updateBlog = async (blogId: string, authorId: string, input: IBlog) => {
    try {
      const blog = await this.queryDB.blog.findById(blogId)
      if (!blog) {
        throw createError("Blog post not found", 404)
      }

      if (blog.author.toString() !== authorId) {
        throw createError("Unauthorized", 403)
      }

      const updatedBlog = await this.queryDB.blog.findByIdAndUpdate(
        blogId,
        {
          ...input
        },
        { new: true }
      )

      return {
        message: "Blog post updated successfully",
        blog: updatedBlog
      }
    } catch (err) {
      throw err
    }
  }

  deleteBlog = async (blogId: string, authorId: string) => {
    try {
      const blog = await this.queryDB.blog.findById(blogId)
      if (!blog) {
        throw createError("Blog post not found", 404)
      }

      if (blog.author.toString() !== authorId.toString()) {
        throw createError("Unauthorized", 403)
      }

      await this.queryDB.blog.findByIdAndDelete(blogId)
      return {
        message: "Blog post deleted successfully"
      }
    } catch (err) {
      throw err
    }
  }
}
