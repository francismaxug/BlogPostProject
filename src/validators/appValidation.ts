//----------JOI VALIDATOR TO VALIDATE USER INPUTS-----------------
import Joi from "joi"

//-------------------VALIDATE USER INPUTS---------------------
const validateUser = (schema: Joi.ObjectSchema<any>) => (payload: any) =>
  schema.validate(payload, { abortEarly: true })
const userValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "gh"] }
    })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .required()
})
const userValidator = validateUser(userValidation)

//-------------------VALIDATE BLOG INPUTS---------------------

const validateBlog = (schema: Joi.ObjectSchema<any>) => (payload: any) =>
  schema.validate(payload, { abortEarly: true })
const blogValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
})

const blogValidator = validateBlog(blogValidation)

//-------------------VALIDATE COMMENT INPUTS---------------------
const validateComment = (schema: Joi.ObjectSchema<any>) => (payload: any) =>
  schema.validate(payload, { abortEarly: true })
const commentValidation = Joi.object({
  comment: Joi.string().required()
})
const commentValidator = validateComment(commentValidation)

export { userValidator, commentValidator, blogValidator }
