import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/users.model'
import User from '../types/user.type'
import jwt from 'jsonwebtoken'
import config from '../config'

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

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usermodel.getOne(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: parseInt(req.params.id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }

  try {
    const newUser = await usermodel.updateOne(user)
    res.json({
      message: 'updated successfully',
      data: { ...newUser }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    await usermodel.deleteOne(id)
    res.json(`user ${id} deleted successfully`)
  } catch (error) {
    next(error)
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, password } = req.body
    const user = await usermodel.authenticate(firstName, password)
    const token = jwt.sign({ user }, config.token as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        messagae: 'username and password do not match'
      })
    }
    return res.status(200).json({
      status: 'success',
      data: { ...user, token },
      messgae: 'authenticated successfully'
    })
  } catch (error) {
    next(error)
  }
}
