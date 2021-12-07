import React, { useContext } from 'react'
import CategoryContext from '../context/category/categoryContext'
import productContext from '../context/product/productContext'
import UserContext from '../context/user/UserContext'
import AlertMessage from './AlertMessage'
import Loader from './Loader'

const Misc = () => {
  // for product context
  const pContext = useContext(productContext)
  const { productsLoading, productsMessage, productsError } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { categoriesError, categoriesLoading, categoriesMessage } = cContext

  // for user context
  const uContext = useContext(UserContext)
  const { userError, userLoading, userMessage } = uContext

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
      {userLoading && <Loader />}
      {userError && (
        <AlertMessage variant={userError.variant}>
          {userError.message}
        </AlertMessage>
      )}
      {userMessage && (
        <AlertMessage variant={userMessage.variant}>
          {userMessage.message}
        </AlertMessage>
      )}
    </div>
  )
}

export default Misc
