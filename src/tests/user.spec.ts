import UserModel from '../models/users.model'
import database from '../database'
import supertest from 'supertest'
import app from '..'

const request = supertest(app)

const usermodel = new UserModel()

describe('Test users model methods', () => {
  describe('Test methods exist', () => {
    it('Shuold find get many users method', () => {
      expect(usermodel.getMany).toBeDefined()
    })
    it('Should find get one user method', () => {
      expect(usermodel.getOne).toBeDefined()
    })
    it('Sholud find update user model', () => {
      expect(usermodel.updateOne).toBeDefined()
    })
    it('Sholud find delete user model', () => {
      expect(usermodel.deleteOne).toBeDefined()
    })
  })

  describe('Test user model logic', () => {
    const firstname = 'Eslam'
    const lastname = 'Ashraf'
    const password = 'eslam900100'
    let id: string

    beforeAll(async () => {
      const newUser = await usermodel.createUser(firstname, lastname, password)
      id = newUser.id as unknown as string
    })

    afterAll(async () => {
      const connection = await database.connect()
      const sql = 'DELETE FROM users;'
      const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
      await connection.query(sql)
      await connection.query(sql2)
      connection.release()
    })

    it('should get many users', async () => {
      const data = await usermodel.getMany()
      expect(data.length).toBeGreaterThan(0)
    })

    it('should return one user', async () => {
      const data = await usermodel.getOne(id as unknown as string)
      expect(data.id).toBe(parseInt(id))
      expect(data.firstname).toBe(firstname)
      expect(data.lastname).toBe(lastname)
    })

    it('should update the user and return the new one', async () => {
      const firstname = 'newEslam'
      const lastname = 'newAshraf'
      const password = 'newPAssword'
      const updatedUser = await usermodel.updateOne(firstname, lastname, password, id)

      expect(updatedUser.id).toBe(parseInt(id))
      expect(updatedUser.firstname).toBe('newEslam')
      expect(updatedUser.lastname).toBe('newAshraf')
    })

    it('should delete user and return the id', async () => {
      const deletedUser = await usermodel.deleteOne(id as unknown as string)
      expect(deletedUser.id).toBe(parseInt(id))
    })
  })
})
