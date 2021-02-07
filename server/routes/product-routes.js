import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import { authenticate, isAdmin } from '../middleware/auth.js'

import Product from '../models/product-model.js'

// @desc    Returns all products
// @route   GET /api/products
// @access  Public
router.get('/products', asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}))

// @desc    Returns a single specified product
// @route   GET /api/products/:id
// @access  Public
router.get('/products/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found.' })
  }
}))

// @desc    Deletes a specified product
// @route   DELETE /api/products/:id
// @access  Admin
router.delete('/products/:id', authenticate, isAdmin, asyncHandler(async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id)

  if (result) {
    res.json({ message: `Product ${req.params.id} deleted successfully.` })
  } else {
    res.status(404)
    throw new Error(`Product ${req.params.id} not found.`)
  }
}))

export default router