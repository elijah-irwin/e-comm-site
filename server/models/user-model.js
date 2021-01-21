import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true })

userSchema.methods.verifyPassword = async function (x) {
  // try 
  return await bcrypt.compare(x, this.password)
  // catch
}

const User = mongoose.model('User', userSchema)

export default User