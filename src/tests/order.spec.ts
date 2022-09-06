import app from '..'
import database from '../database'
import OrderModel from '../models/orders.model'
import supertest from 'supertest'
import UserModel from '../models/users.model'
import ProductModel from '../models/products.model'

const request = supertest(app)
const usermodel = new UserModel()
const productmodel = new ProductModel()
const ordermodel = new OrderModel()

describe('Test orders model', () => {
  describe('Test methods exist', () => {
    it('should find create order method', () => {
      expect(ordermodel.createOrder).toBeDefined()
    })
    it('should find get many orders method', () => {
      expect(ordermodel.getMany()).toBeDefined()
    })
    it('should find get one order method', () => {
      expect(ordermodel.getOne).toBeDefined()
    })
    it('should find update user method', () => {
      expect(ordermodel.updateOne).toBeDefined()
    })
    it('should find delete user method', () => {
      expect(ordermodel.deleteOne).toBeDefined()
    })
  })

  describe('Test order model logic', () => {
    beforeAll(async () => {
      await usermodel.createUser({
        firstname: 'Eslam',
        lastname: 'Ashraf',
        password: 'eslam900190'
      })
      await productmodel.createProduct({
        name: 'phone',
        price: 100
      })
    })

    afterAll(async () => {
      const connection = await database.connect()
      const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
      await connection.query(sql)
      connection.release()
      await usermodel.deleteOne('1')
      await productmodel.deleteOne('1')
    })

    it('test create order', async () => {
      const result = await ordermodel.createOrder({
        productid: 1,
        quantity: 15,
        userid: 1,
        status: 'active'
      })
      expect(result).toEqual({
        id: 1,
        productid: 1,
        quantity: 15,
        userid: 1,
        status: 'active'
      })
    })
    it('test getMany orders', async () => {
      const results = await ordermodel.getMany()
      expect(results.length).toBeGreaterThan(0)
    })
    it('test get one order', async () => {
      const result = await ordermodel.getOne('1')
      expect(result).toEqual({
        id: 1,
        productid: 1,
        quantity: 15,
        userid: 1,
        status: 'active'
      })
    })
    it('test delete order', async () => {
      const result = await ordermodel.deleteOne('1')
      expect(result.id).toEqual(1)
    })
  })
})

describe('Test order endpoints', () => {
  it('test get all orders endpoint', async () => {
    const res = await request.get('/orders')
    expect(res.status).toBe(200)
  })
  it('test get one order endpoint', async () => {
    const res = await request.get('/orders/1')
    expect(res.status).toBe(200)
  })
})
