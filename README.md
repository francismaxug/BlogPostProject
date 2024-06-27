# Blogging App Backend API
This README details the design, implementation, and functionality of the backend API for a blogging app.
## 1. Introduction
This backend API is built using Node.js, Express.js, and Mongoose (for MongoDB interactions). It provides the core functionality for managing blog posts, comments, and user accounts. 
## 2. Technologies Used
* **Node.js:**  JavaScript runtime environment.
* **Express.js:** Web framework for Node.js.
* **Mongoose:**  Object Data Modeling (ODM) for MongoDB.
* **MongoDB:**  NoSQL database.
* **JWT (JSON Web Tokens):**  Used for user authentication.
* **TypeScript:**  For improved type safety and code maintainability.
* **JOI:**  For validating inputs to ensure data intergrity.
## Programming Paragime used:
**OOP**
  
## 3. API Endpoints
### 3.1 Authentication
* **POST `/api/v1/user/register`:** Register a new user.
   - **Request Body:**
      ```json
      {
        "name": "yourUsername",
        "email": "yourEmail",
        "password": "yourPassword"
      }
      ```
   - **Response:**
      ```json
      {
        "message": "User registered successfully",
        "user": {...} // User object 
      }
      ```
* **POST `/api/v1/user/login`:** Log in an existing user.
   - **Request Body:**
      ```json
      {
        "email": "yourUsername",
        "password": "yourPassword"
      }
      ```
   - **Response:**
      ```json
      {
        "message": "Login successful",
        "user": {...} // User object 
      }
      ```
### 3.2 Blog Posts
* **POST `/api/v1/blog/create-blog`:** Create a new blog post.
   - **Request Body (Requires authentication):**
      ```json
      {
        "title": "My Awesome Post",
        "content": "This is the content of my post..."
      }
      ```
   - **Response:**
      ```json
      {
        "message": "Blog Post created successfully",
        "blog": {...} // Blog object
      }
      ```
* **GET `/api/v1/blog/getAllBlogs`:** Get all blog posts (paginated).
   - **Query Parameters:**
      ```
      ?page=1&limit=5
      ```
   - **Response:**
      ```json
      {
        "posts": [ ... ], // Array of post objects
        "totalPages": 5, // Total number of pages
        "currentPage": 1 // Current page
      }
      ```
* **GET `/api/v1/blog/:postId`:** Get a single blog post by ID.
   - **Response:**
      ```json
      {
        "blog": {...} // blog Post object
      }
      ```
* **GET `/api/v1/blog/getMyBlogs`:** Get all user login  blog post. (paginated)
   - **Response:**
      ```json
      {
        "blog": {...} // blog Post object
      }
      ```
* **PATCH `/api/v1/blog/:postId`:** Update a blog post by ID.
   - **Request Body (Requires authentication):**
      ```json
      {
        "title": "Updated Title",
        "content": "Updated Content"
      }
      ```
   - **Response:**
      ```json
      {
        "message": "Post updated successfully",
        "blog": {...} // Updated post object
      }
      ```
* **DELETE `/api/v1/blog/:postId`:** Delete a blog post by ID.
   - **Response:**
      ```json
      {
        "message": "Post deleted successfully"
      }
      ```
### 3.3 Comments
* **POST `/api/v1/comment/:postId/create`:** Create a comment on a specific post.
   - **Request Body (Requires authentication):**
      ```json
      {
        "comment": "This is my comment..."
      }
      ```
   - **Response:**
      ```json
      {
        "message": "Comment created successfully",
        "comment": {...} // Comment object
      }
      ```
* **GET `/api/v1/comment/:postId/commentbypost`:** Get all comments for a specific post (paginated).
   - **Query Parameters:**
      ```
      ?page=1&limit=5
      ```
   - **Response:**
      ```json
      {
        "comments": [ ... ], // Array of comment objects
        "totalPages": 5, // Total number of pages
        "currentPage": 1 // Current page
      }
      ```
* **DELETE `/api/v1/comment/:commentId`:** Delete a comment by ID.
   - **Response:**
      ```json
      {
        "message": "Comment deleted successfully"
      }
      ```
## 4. Database Schema
### 4.1 User
```typeScript
// models/userModel.ts
import { Schema, model, models } from "mongoose"
import bcrypt from "bcryptjs"
import { IUserModel, IUserSchema } from "../types/user"

const userSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    required: [true, "name is a required filed"]
  },
  email: {
    type: String,
    required: [true, "email is a required filed"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "paassword is a required filed"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: { 
  type: Date, default: Date.now 
}
})

//Hash password before saving into database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    const hashs = await bcrypt.hash(this.password, salt)
    this.password = hashs
    return
  } catch (error) {
    console.log(error)
  }
})

//compaere passwords
userSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

//remove password before sending responds
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

const User = models.User || model<IUserSchema, IUserModel>("User", userSchema)
export default User

```


### 4.2 Blog
```typeScript
// models/blogModel.ts
import { model, models, Schema } from "mongoose"
import { IBlogModel, IBlogSchema } from "../types/blog"

const blogSchema: Schema = new Schema<IBlogSchema>({
  title: { 
    type: String, 
    required: [true, "title is a required field"]
   },
  content: { 
    type: String, 
    required: [true, "content is a required field"] 
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true, ref: "User"
   },
  createdAt: { 
    type: Date,
    default: Date.now
   },
  updatedAt: { 
    type: Date, 
    default: Date.now
   }
})
const Blog = models.Blog || model<IBlogSchema, IBlogModel>("Blog", blogSchema)

export default Blog
```

### 4.3 Comment
```javascript
// models/commentModel.ts
import { model, models, Schema } from "mongoose"
import { ICommentModel, ICommentSchema } from "../types/comment"

const commentSchema: Schema = new Schema<ICommentSchema>({
  comment: { 
    type: String,
    required: [true, "content is a required field"]
  },
  author: {
    type: Schema.Types.ObjectId, 
    required: true, ref: "User"
   },
  post: {
    type: Schema.Types.ObjectId,
    required: true, ref: "Blog"
   },
  createdAt: { 
    type: Date, 
    default: Date.now
   },
  updatedAt: { 
    type: Date, 
    default: Date.now }
})
const Comment =
  models.Comment ||
  model<ICommentSchema, ICommentModel>("Comment", commentSchema)

export default Comment
```
## 5. Project Setup
```
## Clone Repository
git clone https://github.com/francismaxug/BlogPostProject
cd BlogPostProject

## Install dependencies
npm install

## Configure Environment Variables
Create a .env file at the root of the project with the following content:
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key

## Run the project
npm run dev
```

# 6. Design and Implementation Decisions

* Authentication: JWT was chosen with HTPP Only Cookie for authentication due to its simplicity and security.
* Database: MongoDB was selected for its scalability and flexibility.
* Pagination: Pagination was implemented for /api/posts and /api/posts/:postId/comments to handle large datasets efficiently.
* Error Handling: Custom error handling with createError was implemented for better error management and client-side feedback.
* TypeScript: TypeScript was used to ensure type safety and code maintainability.

  ## END
