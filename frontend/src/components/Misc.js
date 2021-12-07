import React, { useContext } from 'react'
import CategoryContext from '../context/category/categoryContext'
import productContext from '../context/product/productContext'
import AlertMessage from './AlertMessage'
import Loader from './Loader'

const Misc = () => {
  // for product context
  const pContext = useContext(productContext)
  const { productsLoading, productsMessage, productsError } = pContext

  // for product context
  const cContext = useContext(CategoryContext)
  const { categoriesError, categoriesLoading, categoriesMessage } = cContext

  return (
    <div>
      {productsLoading && <Loader />}

      {productsError && (
        <AlertMessage variant={productsError.variant}>
          {productsError.message}
        </AlertMessage>
      )}

      {productsMessage && (
        <AlertMessage variant={productsMessage.variant}>
          {productsMessage.message}
        </AlertMessage>
      )}

      {categoriesLoading && <Loader />}

      {categoriesError && (
        <AlertMessage variant={categoriesError.variant}>
          {categoriesError.message}
        </AlertMessage>
      )}

      {categoriesMessage && (
        <AlertMessage variant={categoriesMessage.variant}>
          {categoriesMessage.message}
        </AlertMessage>
      )}
    </div>
  )
}

export default Misc
