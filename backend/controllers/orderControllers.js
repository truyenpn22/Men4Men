import Order from '../models/Order.js'

// @desc Place new order
// @route POST '/api/orders/new'
// @access Private : User / admin
export const placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).json({ success: true, message: 'order placed', order })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
