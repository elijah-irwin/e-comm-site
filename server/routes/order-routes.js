import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import { authenticate } from '../middleware/auth.js'
import Order from '../models/order-model.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/orders', authenticate, asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if (!orderItems || orderItems.length === 0) {
    res.status(400)
    throw new Error('No items in order.')
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
}))

export default router