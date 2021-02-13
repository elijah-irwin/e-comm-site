// Libraries
import express from 'express'
import path from 'path'
import chalk from 'chalk'
import dotenv from 'dotenv'
dotenv.config()

// Local Code
import connectToDB from './db/index.js'
import ProductRoutes from './routes/product-routes.js'
import UserRoutes from './routes/user-routes.js'
import OrderRoutes from './routes/order-routes.js'
import { errorHandler, routeNotFound } from './middleware/error-handlers.js'

// Init App & Connect to DB
const app = express()
app.use(express.json())
connectToDB()

// Specific Routes
app.use('/api', ProductRoutes)
app.use('/api', UserRoutes)
app.use('/api', OrderRoutes)

// Images Folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Paypal Key
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Error Handlers
app.use(routeNotFound)
app.use(errorHandler)

// Start Server
const PORT = process.env.PORT || 3001
const ENV = process.env.NODE_ENV
app.listen(PORT, () => {
  console.log(chalk.blue(`[server:${ENV}] Listening on port ${PORT}!`))
})