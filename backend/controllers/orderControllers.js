import Order from '../models/Order.js'

// @desc Place new order
// @route POST '/api/orders/new'
// @access Private : User/Admin
export const placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).json({ success: true, message: 'order placed', order })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get all orders
// @route GET '/api/orders/all'
// @access Private : Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort('-createdAt')
    res.status(201).json({ success: true, orders })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
