import bcrypt from 'bcryptjs'

export function hashPassword(password) {
  return bcrypt.hashSync(password)
}

export function checkPassword(unencryptedPassword, passwordInDb) {
  return bcrypt.compareSync(unencryptedPassword, passwordInDb)
}