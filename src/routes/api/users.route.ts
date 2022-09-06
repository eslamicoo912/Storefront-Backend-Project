import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'
import { validateToken } from '../../middleware/authentication.middleware'

const routes = Router()

routes.post('/', validateToken, controllers.createUser)
routes.get('/', validateToken, controllers.getMany)
routes.get('/:id', validateToken, controllers.getOne)
routes.patch('/:id', controllers.updateOne)
routes.delete('/:id', validateToken, controllers.deleteOne)
routes.post('/authenticate', controllers.authenticate)

export default routes
