export class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error"
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

const createError = (message:string, statusCode:number) =>{
  return new AppError(message, statusCode)
} 
export default createError
