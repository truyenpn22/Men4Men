import React, { useEffect, useState } from 'react'
import ProductContext from './productContext'
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
  const [products, setProducts] = useState([])
  const [productsError, setProductsError] = useState(null)
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsMessage, setProductsMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setProductsError(null)
      setProductsMessage(null)
    }, 3000)
  }, [productsError, productsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setProductsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setProductsError({
        variant: 'danger',
        message: `${info},  No response from server!`,
      })
    } else {
      setProductsError({ variant: 'danger', message: err.message })
    }
    setProductsLoading(false)
  }

  // Add new product
  const addProduct = async (name, sku, category, price, description, image) => {
    const productBody = clean({
      name,
      sku,
      category,
      price,
      description,
      image,
    })
    try {
      setProductsLoading(true)
      await axios.post('api/products/add', productBody)
      setProducts([...products, productBody])
      setProductsMessage({
        variant: 'success',
        message: 'Product added successfully!',
      })
      setProductsLoading(false)
      setProductsError(null)
    } catch (err) {
      errorHandler(err, 'Could not add product')
    }
  }

  // get all Products
  const getProducts = async () => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/getAll`)
      setProducts(data.products)
      setProductsLoading(false)
      setProductsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get category wise products
  const getCategoryWiseProducts = async cid => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`api/products/getAll?category=${cid}`)
      setProducts(data.products)
      setProductsLoading(false)
      setProductsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get one product
  const getOneProduct = async id => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/${id}`)
      setProductsLoading(false)
      setProductsError(null)
      return data.product
    } catch (err) {
      errorHandler(err)
    }
  }

  //   const updateCategory = async (id, title, image) => {
  //     try {
  //       await axios.patch(`api/category/${id}`, { title, image })
  //       getCategories()
  //     } catch (err) {
  //       errorHandler(err)
  //     }
  //   }

  return (
    <ProductContext.Provider
      value={{
        products,
        productsError,
        productsLoading,
        productsMessage,
        addProduct,
        getProducts,
        getCategoryWiseProducts,
        getOneProduct,
      }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
