import UserModel from '../models/users.model'
import database from '../database'
import User from '../types/user.type'
import supertest from 'supertest'
import app from '..'

const request = supertest(app)

const usermodel = new UserModel()

describe('Test users model methods', () => {
  describe('Test methods exist', () => {
    it('Shuold find get many users method', () => {
      expect(usermodel.getMeny).toBeDefined()
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
    const user: User = {
      firstname: 'Eslam',
      lastname: 'Ashraf',
      password: 'eslam900100'
    }

    beforeAll(async () => {
      const newUser = await usermodel.createUser(user)
      user.id = newUser.id
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
      const data = await usermodel.getMeny()
      expect(data.length).toBeGreaterThan(0)
    })

    it('should return one user', async () => {
      const data = await usermodel.getOne(user.id as unknown as string)
      expect(data.id).toBe(user.id)
      expect(data.firstname).toBe(user.firstname)
      expect(data.lastname).toBe(user.lastname)
    })

    it('should update the user and return the new one', async () => {
      const updatedUser = await usermodel.updateOne({
        ...user,
        firstname: 'newEslam',
        lastname: 'newAshraf',
        password: 'newPAssword'
      })

      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.firstname).toBe('newEslam')
      expect(updatedUser.lastname).toBe('newAshraf')
    })

    it('should delete user and return the id', async () => {
      const deletedUser = await usermodel.deleteOne(user.id as unknown as string)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})

describe('Test crud api methods', () => {
  it('test getAll users endpoint', async () => {
    const res = await request.get('/users')
    expect(res.status).toBe(200)
  })
  it('test getOne user endpoint', async () => {
    const res = await request.get(`/users/${1}`)
    expect(res.status).toBe(200)
  })
})
