// Libraries
import express from 'express'
import chalk from 'chalk'
import dotenv from 'dotenv'
dotenv.config()

// Local Code
import connectToDB from './db/index.js'
import ProductRoutes from './routes/product-routes.js'
import { errorHandler, routeNotFound } from './middleware/error-handlers.js'

// Init App & Connect to DB
const app = express()
connectToDB()

// Base Route
app.get('/', (req, res) => {
  res.send('API is live!')
})

// Specific Routes
app.use('/api', ProductRoutes)

// Error Handlers
app.use(routeNotFound)
app.use(errorHandler)

// Start Server
const PORT = process.env.PORT || 3001
const ENV = process.env.NODE_ENV
app.listen(PORT, () => {
  console.log(chalk.blue(`[server:${ENV}] Listening on port ${PORT}!`))
})