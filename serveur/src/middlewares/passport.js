import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JsonWebTokenStrategy, ExtractJwt } from 'passport-jwt'
import { prisma, PrismaClient } from '@prisma/client'
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
  callbackURL: "http://localhost:3000/api/auth/google/callback"
},
/*function(token, tokenSecret, profile, done) {
  const prisma = new PrismaClient()
    prisma.user.findUnique({ googleId: profile.id }, function (err, user) {
      if (!user){ 
        user = await prisma.user.create({data: { } })
      }

      return done(err, user);
    });
}
*/
async (token, tokenSecret, profile, done) => {
  const prisma = new PrismaClient()
//1. Password generate


// 2. Checking if user exist

let user = await prisma.user.findUnique({where: { googleId: profile.id }})
if (!user) {
  user = await prisma.user.create({data: {googleId: profile.id, firstname: profile.given_name, lastname: profile.family_name, email: profile.email, encryptedPassword: ""}})
}

done(null, user)
}
));

