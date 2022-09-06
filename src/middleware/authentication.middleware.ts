import config from '../config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (bearer && token === 'bearer') {
        const decode = jwt.verify(token, config.token as unknown as string)
        if (decode) {
          next()
        }
      }
    }
  } catch (error) {
    next(error)
  }
}
