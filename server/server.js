import express from 'express'
import chalk from 'chalk'
import dotenv from 'dotenv'
dotenv.config()

import connectToDB from './db/index.js'
import ProductRoutes from './routes/product-routes.js'

const app = express()
connectToDB()

app.get('/', (req, res) => {
  res.send('API is live!')
})

app.use('/api', ProductRoutes)

const PORT = process.env.PORT || 1234
const ENV = process.env.NODE_ENV
app.listen(PORT, () => {
  console.log(chalk.blue(`[server:${ENV}] Listening on port ${PORT}!`))
})