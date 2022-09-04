import config from '../config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const handleAuthenticationError = (next: NextFunction) => {
  const error: Error = new Error('Login error')
  next(error)
}

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (bearer && token === 'bearer') {
        const decode = jwt.verify(token, config.token as unknown as string)
        if (decode) {
          next()
        } else {
          handleAuthenticationError(next)
        }
      } else {
        handleAuthenticationError(next)
      }
    } else {
      handleAuthenticationError(next)
    }
  } catch (error) {
    next(error)
  }
}

export default validateToken
