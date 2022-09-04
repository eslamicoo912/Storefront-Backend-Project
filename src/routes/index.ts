import { Router } from 'express'
import usersRoute from './api/users.route'
import productsRoute from './api/products.route'

const routes = Router()

routes.use('/users', usersRoute)
routes.use('/products', productsRoute)

export default routes
