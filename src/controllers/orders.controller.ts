import OrderModel from '../models/orders.model'
import { NextFunction, Request, Response } from 'express'
import Order from '../types/order.type'

const ordermodel = new OrderModel()

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productid = req.body.productid
    const quantity = req.body.quantity
    const userid = req.body.userid
    const status = req.body.status
    const newOrder = await ordermodel.createOrder(productid, quantity, userid, status)
    res.json({
      status: 'success',
      data: { ...newOrder },
      message: 'order created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordermodel.getMany()
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    const order = await ordermodel.getOne(id)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const productid = req.body.productid
  const quantity = req.body.quantity
  const userid = req.body.userid
  const status = req.body.status

  try {
    const newOrder = await ordermodel.updateOne(productid, quantity, userid, id, status)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    await ordermodel.deleteOne(id)
    res.json(`order ${id} deleted successfully`)
  } catch (error) {
    next(error)
  }
}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const orderid: string = req.params.id
  const productid: string = req.body.productid
  const quantity: number = parseInt(req.body.quantity)

  try {
    const order = await ordermodel.addProduct(quantity, orderid, productid)
    res.json({
      status: 'success',
      data: { ...order },
      message: `product ${productid} added to order ${orderid}`
    })
  } catch (error) {
    next(error)
  }
}
