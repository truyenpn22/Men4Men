import { useState } from 'react'
import ProductContext from './productContext'
import axios from 'axios'

// ------------------------------------------
// Product State
// ------------------------------------------
const ProductState = props => {
  const [products, setProducts] = useState([])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      console.log(`Error: ${err.response.data.error}`)
    } else if (err.request) {
      console.log(`Error:${err.message}`)
    } else {
      console.log(`Error: No response from server!`)
    }
  }

  // Add new product
  const addProduct = async (name, sku, category, price, description, image) => {
    try {
      await axios.post('api/products/add', {
        name,
        sku,
        category,
        price,
        description,
        image,
      })
      setProducts([
        ...products,
        { name, sku, category, price, description, image },
      ])
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all Products
  const getProducts = async () => {
    try {
      const { data } = await axios.get('api/products/getAll')
      setProducts(data.products)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get one category
  //   const getOneCategory = async id => {
  //     try {
  //       const { data } = await axios.get(`/api/category/${id}`)
  //       return data.categories
  //     } catch (err) {
  //       errorHandler(err)
  //     }
  //   }

  //   const updateCategory = async (id, title, image) => {
  //     try {
  //       await axios.patch(`api/category/${id}`, { title, image })
  //       getCategories()
  //     } catch (err) {
  //       errorHandler(err)
  //     }
  //   }

  return (
    <ProductContext.Provider value={{ products, addProduct, getProducts }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
