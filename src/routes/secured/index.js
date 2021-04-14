import {Router} from 'express'
import user from './users'
import bar from './bars'
import map from './maps'

const api = Router()

api.use('/user', user)
api.use('/bars', bar)
api.use('/maps', map)
export default api