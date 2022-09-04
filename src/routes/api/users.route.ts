import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'

const routes = Router()

routes.post('/', controllers.createUser)
routes.get('/', controllers.getMany)
routes.get('/:id', controllers.getOne)
routes.patch('/:id', controllers.updateOne)
routes.delete('/:id', controllers.deleteOne)

export default routes
