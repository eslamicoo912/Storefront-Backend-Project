import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/users.model'
import User from '../types/user.type'

const usermodel = new UserModel()

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }
  try {
    const newUser = await usermodel.createUser(user)
    res.json({
      message: 'user created successfully',
      data: { ...newUser }
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usermodel.getMeny()
    res.json(users)
  } catch (error) {
    next(error)
  }
}
