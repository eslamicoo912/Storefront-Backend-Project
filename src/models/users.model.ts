/* eslint-disable @typescript-eslint/no-empty-function */
import database from '../database'
import User from '../types/user.type'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  async createUser(u: User): Promise<User> {
    try {
      const connection = await database.connect()
      const sql = `INSERT INTO users (firstName,lastName,password) VALUES($1, $2, $3) RETURNING *`
      const result = await connection.query(sql, [
        u.firstName,
        u.lastName,
        hashPassword(u.password)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getMeny(): Promise<User[]> {
    try {
      const connection = await database.connect()
      const sql = `SELECT id,firstName,lastName FROM users`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getOne(id: string): Promise<User> {
    try {
      const connection = await database.connect()
      const sql = 'SELECT id,firstName,lastName FROM users WHERE id=$1'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async updateOne(u: User): Promise<User> {
    try {
      const connection = await database.connect()
      const sql =
        'UPDATE users SET firstName=$1,lastName=$2,password=$3 WHERE id=$4 RETURNING id,firstName,lastName'
      const result = await connection.query(sql, [
        u.firstName,
        u.lastName,
        hashPassword(u.password),
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await database.connect()
      const sql = 'DELETE FROM users WHERE id=$1 RETURNING id,firstName,lastName'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async authenticate(firstName: string, password: string): Promise<User | null> {
    try {
      const connection = await database.connect()
      const sql = 'SELECT password from users WHERE firstName=$1'
      const result = await connection.query(sql, [firstName])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isValidPassword = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isValidPassword) {
          const userInfo = await connection.query(
            'SELECT id,firstName,lastName FROM users WHERE firstName=$1',
            [firstName]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}

export default UserModel
