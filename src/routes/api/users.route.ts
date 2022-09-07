import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'
import { validateToken } from '../../middleware/authentication.middleware'

const routes = Router()

routes.post('/', validateToken, controllers.createUser)
routes.get('/', controllers.authenticate, controllers.getMany)
routes.get('/:id', controllers.authenticate, controllers.getOne)
routes.patch('/:id', controllers.updateOne)
routes.delete('/:id', controllers.deleteOne)

export default routes
