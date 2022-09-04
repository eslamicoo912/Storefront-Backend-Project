import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.post('/', controllers.createUser)
routes.get('/', authenticationMiddleware, controllers.getMany)
routes.get('/:id', controllers.getOne)
routes.patch('/:id', controllers.updateOne)
routes.delete('/:id', controllers.deleteOne)
routes.post('/authenticate', controllers.authenticate)

export default routes
