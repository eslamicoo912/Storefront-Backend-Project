import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/products.model'

const productmodel = new ProductModel()

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const name: string = req.body.name
  const price: number = req.body.price

  try {
    const newProduct = await productmodel.createProduct(name, price)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
}

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productmodel.getMeny()
    res.json(products)
  } catch (error) {
    next(error)
  }
}
