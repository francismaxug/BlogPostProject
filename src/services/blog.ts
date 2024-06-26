import { IAppContext, IAppService } from "../types/app"
import { IBlog } from "../types/blog"
import createError from "../utils/appError"

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

  //---get all blog posts------------
  getAllBlogs = async (page: number, limit: number) => {
    console.log(`Page: ${page}, Limit: ${limit}`)
    const totalBlogs = await this.queryDB.blog.countDocuments()
    const blogs = await this.queryDB.blog
      .find()
      .populate("author")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }) // Sort by newest first

    return {
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page
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
