import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/users.model'
import User from '../types/user.type'
import jwt from 'jsonwebtoken'
import config from '../config'

const usermodel = new UserModel()

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  }
  try {
    const newUser = await usermodel.createUser(user)
    const token = jwt.sign({ newUser }, config.token as unknown as string)
    res.json({
      message: 'user created successfully',
      data: { ...newUser },
      token: { token }
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
    firstname: req.body.firstname,
    lastname: req.body.lastname,
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
    const { firstname, password } = req.body
    const user = await usermodel.authenticate(firstname, password)
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
