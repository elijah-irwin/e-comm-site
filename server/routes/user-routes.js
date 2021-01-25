import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import User from '../models/user-model.js'
import { generateToken } from '../utils/helpers.js'
import { authenticate } from '../middleware/auth.js'

// @desc    Registers a new user and returns a token
// @route   POST /api/users
// @access  Public
router.post('/users', asyncHandler(async (req, res) => {
  const { email, password, name } = req.body
  const user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('Account already exists.')
  }

  // Create new user
  const newUser = await new User({ name, email, password }).save()

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: generateToken(newUser._id)
  })

}))

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
      token: generateToken(user._id)
    })
  }

  res.status(401)
  throw new Error('Invalid email or password.')
}))

// @desc    Gets users profile
// @route   GET /api/users/profile
// @access  Private
router.get('/users/profile', authenticate, asyncHandler(async (req, res) => {
  res.json(req.user)
}))


export default router
