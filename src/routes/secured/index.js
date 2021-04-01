import {Router} from 'express'
import user from './users'
import bar from './bars'

const api = Router()

api.use('/user', user)
api.use('/bars', bar)
export default api