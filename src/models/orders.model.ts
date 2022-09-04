/* eslint-disable @typescript-eslint/no-empty-function */
import database from '../database'

type Order = {
  id?: number
  productId: number
  quantity: number
  userId: number
  status: string
}

export default class OrderModel {
  async createOrder(o: Order): Promise<Order> {
    try {
      const connection = await database.connect()
      const sql =
        'INSERT INTO Orders(productId,quantity,userId,status) VALUES($1,$2,$3,$4) RETURNING *'
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
      const sql = 'SELECT * FROM Orders'
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
}
