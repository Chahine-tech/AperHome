import { Router } from 'express'
import auth from './auth'
//import secured from './secured'
//import passport from 'passport'

const api = Router()

api.get('/', (_req, res) => {
  res.json({ hello: "world" })
})




api.use('/auth', auth)
//api.use('/', passport.authenticate('jwt', { session: false }), secured)

export default api