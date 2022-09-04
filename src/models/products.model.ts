/* eslint-disable @typescript-eslint/no-empty-function */
import database from '../database'
import Product from '../types/product.type'

export default class ProductModel {
  async createProduct(name: string, price: number): Promise<Product> {
    try {
      const connection = await database.connect()
      const sql = `INSERT INTO products (name,price) VALUES($1, $2) returning *`
      const result = await connection.query(sql, [name, price])
      const finalResult = result.rows[0]
      connection.release()
      return finalResult
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getMeny(): Promise<Product[]> {
    try {
      const connection = await database.connect()
      const sql = 'SELECT * FROM Products'
      const result = await connection.query(sql)
      const finalResult = result.rows
      connection.release()
      return finalResult
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getOne(id: string): Promise<Product> {
    try {
      const connection = await database.connect()
      const sql = 'SELECT * FROM Products WHERE id=$1'
      const result = await connection.query(sql, [id])
      const finalResult = result.rows[0]
      connection.release()
      return finalResult
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async updateOne(p: Product): Promise<Product> {
    try {
      const connection = await database.connect()
      const sql = 'UPDATE products SET name=$1,price=$2 WHERE id=$3 RETURNING *'
      const result = await connection.query(sql, [p.name, p.price, p.id])
      const finalResult = result.rows[0]
      connection.release()
      return finalResult
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteOne(id: string): Promise<Product> {
    try {
      const connection = await database.connect()
      const sql = 'DELETE FROM Products WHERE id=$1 RETURNING *'
      const result = await connection.query(sql, [id])
      const finalResult = result.rows[0]
      connection.release()
      return finalResult
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
