import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
connectDB()

import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('This is the home page')
})

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
)
