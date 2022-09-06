import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/products.model'
import Product from '../types/product.type'

const productmodel = new ProductModel()

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }

  try {
    const newProduct = await productmodel.createProduct(product)
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

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const product = await productmodel.getOne(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const product: Product = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price
  }

  try {
    const newProduct = await productmodel.updateOne(product)
    res.json({
      message: 'updated successfully',
      data: { ...newProduct }
    })
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
