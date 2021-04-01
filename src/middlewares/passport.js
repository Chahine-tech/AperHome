import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JsonWebTokenStrategy, ExtractJwt } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'
import { checkPassword } from '../utils/password'
import dotenv from 'dotenv'

/**
 * Strategy with credential email/password
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, next) => {
  try {
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return next('E-mail not found', null)
    }

    if (!checkPassword(password, user.encryptedPassword)) {
      return next('Incorrect Password', null)
    }


    next(null, user)
  } catch (err) {
    next(err.message, null)
  }
}))


/**
 * Strategy with json web token
 */
dotenv.config()

passport.use(new JsonWebTokenStrategy({
  secretOrKey: process.env.JWT_ENCRYPTION,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (jwtPayload, next) => {
  try {
    const { email } = jwtPayload

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return next('Token is invalid', null)
    }

    next(null, user)
  } catch (err) {
    next(err.message, null)
  }
}))