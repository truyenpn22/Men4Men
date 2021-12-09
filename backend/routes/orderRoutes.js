import express from 'express'
import { getAllOrders, placeOrder } from '../controllers/orderControllers.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = express.Router()

router.post('/new', auth, placeOrder)

router.get('/getAll', auth, checkAdmin, getAllOrders)

export default router
