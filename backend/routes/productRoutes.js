import express from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/productController.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = express.Router()

router.post('/add', auth, checkAdmin, addProduct)

router.get('/getAll', getAllProducts)

router.get('/:id', getProduct)

router.patch('/:id', auth, checkAdmin, updateProduct)

router.delete('/:id', auth, checkAdmin, deleteProduct)

export default router
