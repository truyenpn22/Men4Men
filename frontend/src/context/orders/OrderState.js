import React, { useEffect, useState } from 'react'
import OrderContext from './orderContext'
import axios from 'axios'

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
// Product State
// ------------------------------------------
const ProductState = props => {
  //   const [products, setProducts] = useState([])
  //   const [productsError, setProductsError] = useState(null)
  //   const [productsLoading, setProductsLoading] = useState(false)
  //   const [productsMessage, setProductsMessage] = useState(null)

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setProductsError(null)
  //       setProductsMessage(null)
  //     }, 3000)
  //   }, [productsError, productsMessage])

  // Error Handler function
  //   const errorHandler = (err, info) => {
  //     if (err.response) {
  //       setProductsError({
  //         variant: 'danger',
  //         message: `${info}, ${err.response.data.error}`,
  //       })
  //     } else if (err.request) {
  //       setProductsError({
  //         variant: 'danger',
  //         message: `${info},  No response from server!`,
  //       })
  //     } else {
  //       setProductsError({ variant: 'danger', message: err.message })
  //     }
  //     setProductsLoading(false)
  //   }

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
    const productBody = clean({
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
      //   setProductsLoading(true)
      await axios.post('api/orders/new', productBody, { headers })
      console.log('order placed')
      //   setProducts([...products, productBody])
      //   setProductsMessage({
      //     variant: 'success',
      //     message: 'Product added successfully!',
      //   })
      //   setProductsLoading(false)
      //   setProductsError(null)
    } catch (err) {
      console.log('error order not placed', err.response.data.error)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        // products,
        // productsError,
        // productsLoading,
        // productsMessage,
        // addProduct,
        // getProducts,
        // getCategoryWiseProducts,
        // getOneProduct,
      }}>
      {props.children}
    </OrderContext.Provider>
  )
}

export default ProductState
