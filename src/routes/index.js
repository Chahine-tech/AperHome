import { Router } from 'express'
import auth from './auth'
import authgg from './authgoogle'
import secured from './secured'
import passport from 'passport'

const api = Router()

api.get('/', (_req, res) => {
  res.json({ hello: "world" })
})




api.use('/auth', auth)
api.use('/authgoogle', authgg)
api.use('/', passport.authenticate('jwt', { session: false }), secured)

export default api