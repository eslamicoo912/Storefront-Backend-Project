import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'
import { validateToken } from '../../middleware/authentication.middleware'

const routes = Router()

routes.post('/', controllers.createUser)
routes.get('/', validateToken, controllers.getMany)
routes.get('/:id', validateToken, controllers.getOne)
routes.patch('/:id', controllers.updateOne)
routes.delete('/:id', controllers.deleteOne)

export default routes
