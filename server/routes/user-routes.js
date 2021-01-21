import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import User from '../models/user-model.js'

// @desc    Auths a user and returns a token
// @route   POST /api/users/login
// @access  Public
router.post('/users/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && await user.verifyPassword(password)) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  }

  res.status(401)
  throw new Error('Invalid email or password.')
}))

export default router
