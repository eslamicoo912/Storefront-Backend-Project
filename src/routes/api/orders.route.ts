import { Router } from 'express'
import * as controllers from '../../controllers/orders.controller'

const routes = Router()

routes.get('/', controllers.getMany)
routes.get('/:id', controllers.getOne)
routes.post('/', controllers.createOrder)
routes.post('/:id/products', controllers.addProduct)
routes.patch('/:id', controllers.updateOne)
routes.delete('/:id', controllers.deleteOne)

export default routes
