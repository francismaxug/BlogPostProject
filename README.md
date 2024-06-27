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
## 3. API Endpoints
### 3.1 Authentication
* **POST `/auth/signup`:** Register a new user.
   - **Request Body:**
      ```json
      {
        "username": "yourUsername",
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
* **POST `/auth/login`:** Log in an existing user.
   - **Request Body:**
      ```json
      {
        "username": "yourUsername",
        "password": "yourPassword"
      }
      ```
   - **Response:**
      ```json
      {
        "message": "Login successful",
        "token": "yourJWTtoken" // JWT token for authentication
      }
      ```
### 3.2 Blog Posts
* **POST `/api/posts`:** Create a new blog post.
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
        "message": "Post created successfully",
        "post": {...} // Post object
      }
      ```
* **GET `/api/posts`:** Get all blog posts (paginated).
   - **Query Parameters:**
      ```
      ?page=1&limit=10 
      ```
   - **Response:**
      ```json
      {
        "posts": [ ... ], // Array of post objects
        "totalPages": 5, // Total number of pages
        "currentPage": 1 // Current page
      }
      ```
* **GET `/api/posts/:postId`:** Get a single blog post by ID.
   - **Response:**
      ```json
      {
        "post": {...} // Post object
      }
      ```
* **PUT `/api/posts/:postId`:** Update a blog post by ID.
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
        "post": {...} // Updated post object
      }
      ```
* **DELETE `/api/posts/:postId`:** Delete a blog post by ID.
   - **Response:**
      ```json
      {
        "message": "Post deleted successfully"
      }
      ```
### 3.3 Comments
* **POST `/api/posts/:postId/comments`:** Create a comment on a specific post.
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
* **GET `/api/posts/:postId/comments`:** Get all comments for a specific post (paginated).
   - **Query Parameters:**
      ```
      ?page=1&limit=10 
      ```
   - **Response:**
      ```json
      {
        "comments": [ ... ], // Array of comment objects
        "totalPages": 5, // Total number of pages
        "currentPage": 1 // Current page
      }
      ```
* **DELETE `/api/comments/:commentId`:** Delete a comment by ID.
   - **Response:**
      ```json
      {
        "message": "Comment deleted successfully"
      }
      ```
## 4. Database Schema
### 4.1 User
```javascript
// models/userModel.ts
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Don't include the password in API responses
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Compare passwords for login
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;

```


### 4.2 Blog
```javascript
// models/blogModel.ts
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
```

### 4.3 Comment
```javascript
// models/commentModel.js
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
