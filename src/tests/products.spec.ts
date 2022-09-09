import app from '..'
import supertest from 'supertest'
import ProductModel from '../models/products.model'
import database from '../database'

const request = supertest(app)
const productmodel = new ProductModel()

describe('Test product model', () => {
  describe('test mehtods exist', () => {
    it('should find create product method', () => {
      expect(productmodel.createProduct).toBeDefined()
    })
    it('should find get products method', () => {
      expect(productmodel.getMany).toBeDefined()
    })
    it('should find get one product method', () => {
      expect(productmodel.getOne).toBeDefined()
    })
    it('should find update product method', () => {
      expect(productmodel.updateOne).toBeDefined()
    })
    it('should find delete product method', () => {
      expect(productmodel.deleteOne).toBeDefined()
    })
  })

  describe('test methods logic', () => {
    afterAll(async () => {
      const connection = await database.connect()
      const sql = 'DELETE FROM products;'
      const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
      await connection.query(sql)
      await connection.query(sql2)
      connection.release()
    })

    it('test create product method', async () => {
      const name = 'phone'
      const price = 1850
      const result = await productmodel.createProduct(name, price)
      expect(result).toEqual({
        id: 2,
        name: 'phone',
        price: 1850
      })
    })
    it('test get products method', async () => {
      const results = await productmodel.getMany()
      expect(results.length).toBeGreaterThan(0)
    })
    it('test get one product', async () => {
      const result = await productmodel.getOne('2')
      expect(result.name).toBe('phone')
    })
    it('should update product and return the new one', async () => {
      const id = '2'
      const name = 'newPhone'
      const price = 2000
      const updatedProduct = await productmodel.updateOne(name, price, id)
      expect(updatedProduct.name).toBe('newPhone')
      expect(updatedProduct.price).toBe(2000)
    })
    it('should delete product and return its id', async () => {
      const result = await productmodel.deleteOne('2')
      expect(result.id).toBe(2)
    })
  })
})

describe('Test products endpoints', () => {
  it('test getAll products endpoint', async () => {
    const res = await request.get('/products')
    expect(res.status).toBe(200)
  })
  it('test getOne product endpoint', async () => {
    const res = await request.get('/products/2')
    expect(res.status).toBe(200)
  })
  it('test post product endpoint', async () => {
    const res = await request.post('/products')
    expect(res.status).toBe(200)
  })
  it('test delete product endpoint', async () => {
    const res = await request.delete('/products/2')
    expect(res.status).toBe(200)
  })
})
