import bcrypt from 'bcryptjs';

export function createPasswordHash(password: string) {
  const saltRounds = 5
  return bcrypt.hashSync(password, saltRounds)
}