import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Mckenzie Irwin',
    email: 'mckenzie@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Drew Cornfield',
    email: 'drew@example.com',
    password: bcrypt.hashSync('123456', 10),
  }
]

export default users