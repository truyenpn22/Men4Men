import express from "express"
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js"

const router = express.Router()

router.post("/add", addProduct)

router.get("/getAll", getAllProducts)

router.get("/:id", getProduct)

router.patch("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router
