import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user-model.js'

export const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const validatedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(validatedToken.userId).select('-password')
    next()
  }

  catch (e) {
    res.status(401)
    throw new Error('Invalid token.')
  }
})