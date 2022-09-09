/* eslint-disable @typescript-eslint/no-empty-function */
import database from '../database'
import Order from '../types/order.type'
import * as orderQueries from '../database/queries/order.queries'

export default class OrderModel {
  // function to run the query that create a new order in the database
  async createOrder(
    productid: string,
    quantity: string,
    userid: string,
    status: string
  ): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = orderQueries.createOrder
      const result = await connection.query(sql, [productid, quantity, userid, status])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // function to run the query that get all orders form the database
  async getMany(): Promise<Order[]> {
    try {
      const connection = await database.connect()
      const sql = orderQueries.getMany
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // function to run the query that create a specific order from the database
  async getOne(id: string): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = orderQueries.getOne
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // function to run the query that update an order in the database
  async updateOne(
    productid: string,
    quantity: string,
    userid: string,
    id: string,
    status: string
  ): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = orderQueries.updateOne
      const result = await connection.query(sql, [productid, quantity, userid, status, id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // function to run the query that delete an order from the database
  async deleteOne(id: string): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = orderQueries.deleteOne
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // function to run the query that add a new product to a specific order in the database
  async addProduct(quantity: number, orderid: string, productid: string): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = orderQueries.addProduct
      const result = await connection.query(sql, [quantity, orderid, productid])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
