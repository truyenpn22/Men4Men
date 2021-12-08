import express from 'express'
import { placeOrder } from '../controllers/orderControllers.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/new', auth, placeOrder)

export default router
