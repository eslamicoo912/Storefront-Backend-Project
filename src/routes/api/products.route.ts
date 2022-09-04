import { Router } from 'express'
import * as controllers from '../../controllers/products.controller'

const routes = Router()

routes.post('/', controllers.createProduct)
routes.get('/', controllers.getMany)

export default routes
