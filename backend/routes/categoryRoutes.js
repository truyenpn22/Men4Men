import express from "express"
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js"

const router = express.Router()

router.post("/add", addCategory)

router.get("/getAll", getAllCategories)

router.get("/:id", getCategory)

router.patch("/:id", updateCategory)

router.delete("/:id", deleteCategory)

export default router
