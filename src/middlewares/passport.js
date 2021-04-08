import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JsonWebTokenStrategy, ExtractJwt } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'
import { checkPassword } from '../utils/password'
import dotenv from 'dotenv'
const GoogleStrategy = require('passport-google-oauth2').Strategy;

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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(token, tokenSecret, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
}
));