import React, { useContext, useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import OrderContext from '../context/orders/orderContext'

const Checkout = () => {
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [orderItems, setOrderItems] = useState([])

  const [paymentMethod, setPaymentMethod] = useState('')

  // for order context
  const oContext = useContext(OrderContext)
  const { placeOrder } = oContext

  const handleChange = e => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  console.log(shippingAddress)
  console.log(paymentMethod, 'Paymnt method')
  console.log(orderItems, 'orderitemes')

  const {
    isEmpty,
    // totalItems,
    // totalUniqueItems,
    cartTotal,
    items,
  } = useCart()

  useEffect(() => {
    if (isEmpty) {
      navigate('/shop')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const newArr = items.map(
      ({ category, createdAt, id, updatedAt, __v, _id, sku, ...keep }) => ({
        ...keep,
        product: _id,
      })
    )

    setOrderItems(newArr)
    // eslint-disable-next-line
  }, [])

  const handlePlaceOrder = () => {
    placeOrder(orderItems, shippingAddress, paymentMethod, cartTotal)
  }

  return (
    <>
      <Breadcrumb pageName="Checkout" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              <div className="p-3 p-lg-5 border">
                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_address" className="text-black">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="c_address"
                      name="address"
                      cols={30}
                      rows={5}
                      value={shippingAddress.address}
                      onChange={handleChange}
                      placeholder="Street address"></textarea>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Postal Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(item => (
                          <tr key={item._id}>
                            <td>
                              {item.name} <strong className="mx-2">x</strong>{' '}
                              {item.quantity}
                            </td>
                            <td>${item.itemTotal}.00</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Cart Subtotal</strong>
                          </td>
                          <td className="text-black">${cartTotal}.00</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Order Total</strong>
                          </td>
                          <td className="text-black font-weight-bold">
                            <strong>${cartTotal}.00</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="form-group my-5">
                      <label className="text-black">
                        Payment Method <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        name="paymentMethod"
                        onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="">Select</option>
                        <option value="cod">Cash On delivery</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-lg py-3 btn-block"
                        onClick={handlePlaceOrder}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  )
}

export default Checkout
