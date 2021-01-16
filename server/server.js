import express from 'express'
import chalk from 'chalk'
import dotenv from 'dotenv'
dotenv.config()

import products from './data/products.js'

const app = express()

app.get('/', (req, res) => {
  res.send('API is live!')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 1234
const ENV = process.env.NODE_ENV
app.listen(PORT, () => {
  console.log(chalk.blue(`[server:${ENV}] Listening on port ${PORT}!`))
})