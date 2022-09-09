import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/products.model'
import Product from '../types/product.type'

const productmodel = new ProductModel()

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name
  const price = req.body.price
  try {
    const newProduct = await productmodel.createProduct(name, price)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
}

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productmodel.getMany()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productmodel.getOne(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const name = req.body.name
  const price = req.body.price

  try {
    const newProduct = await productmodel.updateOne(name, price, id)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    await productmodel.deleteOne(id)
    res.json(`product ${id} deleted`)
  } catch (error) {
    next(error)
  }
}
