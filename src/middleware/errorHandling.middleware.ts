import { Request, Response } from 'express'
import Error from '../interface/Error'
const errorMiddleware = (error: Error, req: Request, res: Response) => {
  const status: number = error.status || 500
  const message: string = error.message || 'error message'
  res.status(status).json({ status, message })
}

export default errorMiddleware
