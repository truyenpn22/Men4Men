import { Router } from 'express'
import {
  deleteProfile,
  login,
  readProfile,
  registerUser,
  updateProfile,
} from '../controllers/userController.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/register', registerUser)

router.post('/login', login)

router.get('/profile', auth, readProfile)

router.patch('/profile', auth, updateProfile)

router.delete('/profile', auth, deleteProfile)

export default router
