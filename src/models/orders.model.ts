/* eslint-disable @typescript-eslint/no-empty-function */
import database from '../database'
import Order from '../types/order.type'

export default class OrderModel {
  async createOrder(o: Order): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql =
        'INSERT INTO orders(productId,quantity,userId,status) VALUES($1,$2,$3,$4) RETURNING *'
      const result = await connection.query(sql, [o.productId, o.quantity, o.userId, o.status])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getMany(): Promise<Order[]> {
    try {
      const connection = await database.connect()
      const sql = 'SELECT * FROM orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getOne(id: string): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = 'SELECT * FROM Orders WHERE id=$1'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async updateOne(o: Order): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql =
        'UPDATE Orders SET productId=$1,quantity=$2,userId=$3,status=$4 WHERE id=$4 RETURNING *'
      const result = await connection.query(sql, [
        o.productId,
        o.quantity,
        o.userId,
        o.status,
        o.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteOne(id: string): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql = 'DELETE FROM Orders WHERE id=$1 RETURNING *'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async addProduct(quantity: number, orderid: string, productid: string): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql =
        'INSERT INTO order_products (quantity , orderid , productid) VALUES ($1, $2, $3) RETURNING *'
      const result = await connection.query(sql, [quantity, orderid, productid])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
