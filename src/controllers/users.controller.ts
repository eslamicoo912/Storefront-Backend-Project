import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/users.model'
import jwt from 'jsonwebtoken'
import config from '../config'

const usermodel = new UserModel()

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const password = req.body.password
  try {
    const newUser = await usermodel.createUser(firstname, lastname, password)
    const token = jwt.sign({ newUser }, config.token as unknown as string)
    res.json(token)
  } catch (error) {
    next(error)
  }
}

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usermodel.getMany()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await usermodel.getOne(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const password = req.body.password

  try {
    const newUser = await usermodel.updateOne(firstname, lastname, password, id)
    res.json(newUser)
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
