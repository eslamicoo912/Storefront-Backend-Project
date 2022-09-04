import OrderModel from '../models/orders.model'
import { NextFunction, Request, Response } from 'express'
import Order from '../types/order.type'

const ordermodel = new OrderModel()

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order: Order = {
    productId: req.body.productid,
    quantity: req.body.quantity,
    userId: req.body.userid,
    status: req.body.status
  }

  try {
    const newOrder = await ordermodel.createOrder(order)
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
    const order = ordermodel.getOne(id)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const order: Order = {
    id: parseInt(req.params.id),
    productId: req.body.productid,
    quantity: req.body.quantity,
    userId: req.body.userid,
    status: req.body.status
  }

  try {
    const newOrder = await ordermodel.updateOne(order)
    res.json({
      data: { ...newOrder },
      message: `order ${order.id} updated successfully`
    })
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
