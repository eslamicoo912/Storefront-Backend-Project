import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'

const routes = Router()

routes.post('/', controllers.createUser)
routes.get('/', controllers.getMany)

export default routes
