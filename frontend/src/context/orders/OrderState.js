import React, { useEffect, useState } from 'react'
import OrderContext from './orderContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

// ------------------------------------------
// Orders State
// ------------------------------------------
const OdersState = props => {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [ordersError, setOrdersError] = useState(null)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersMessage, setOrdersMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setOrdersError(null)
      setOrdersMessage(null)
    }, 3000)
  }, [ordersError, ordersMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setOrdersError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setOrdersError({
        variant: 'danger',
        message: `${info},  No response from server!`,
      })
    } else {
      setOrdersError({ variant: 'danger', message: err.message })
    }
    setOrdersLoading(false)
  }

  // -----------------------------------------
  // Place new order
  //   ---------------------------------------
  const placeOrder = async (
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
  ) => {
    const orderBody = clean({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setOrdersLoading(true)
      await axios.post('api/orders/new', orderBody, { headers })
      localStorage.removeItem('react-use-cart')
      navigate('/thankYou')
      // setProducts([...products, productBody])
      setOrdersMessage({
        variant: 'success',
        message: 'Order placed successfully!',
      })
      setOrdersLoading(false)
      setOrdersError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------
  //  Get all orders
  //   ---------------------------------------
  const getAllOrders = async () => {
    try {
      setOrdersLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get('/api/orders/getAll', { headers })
      setOrders(data.orders)
      setOrdersLoading(false)
      setOrdersError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        orders,
        ordersError,
        ordersLoading,
        ordersMessage,
        getAllOrders,
        // addProduct,
        // getProducts,
        // getCategoryWiseProducts,
        // getOneProduct,
      }}>
      {props.children}
    </OrderContext.Provider>
  )
}

export default OdersState
