import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"
connectDB()

import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"

const app = express()

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/category", categoryRoutes)

app.get("/", (req, res) => {
  res.send("This is the home page")
})

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
)
