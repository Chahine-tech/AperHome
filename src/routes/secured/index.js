import {Router} from 'express'
import user from './users'
import task from './task'

const api = Router()

api.use('/user', user)
api.use('/task', task)
export default api