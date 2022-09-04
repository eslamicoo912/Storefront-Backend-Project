import { Router } from 'express'
import usersRoute from './api/users.route'
import productsRoute from './api/products.route'
import ordersRoute from './api/orders.route'

const routes = Router()

routes.use('/users', usersRoute)
routes.use('/products', productsRoute)
routes.use('/orders', ordersRoute)

export default routes
