import React, { useEffect, useState } from 'react'
import CategoryContext from './categoryContext'
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
// Category State
// ------------------------------------------
const CategoryState = props => {
  const [categories, setCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState(null)
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [categoriesMessage, setCategoriesMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setCategoriesError(null)
      setCategoriesMessage(null)
    }, 3000)
  }, [categoriesError, categoriesMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setCategoriesError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setCategoriesError({
        variant: 'danger',
        message: `${info},  No response from server!`,
      })
    } else {
      setCategoriesError({ variant: 'danger', message: err.message })
    }
    setCategoriesLoading(false)
  }

  // Add new category
  const addCategory = async title => {
    const categoryBody = clean({ title })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setCategoriesLoading(true)
      await axios.post('api/category/add', categoryBody, { headers })
      setCategories([...categories, categoryBody])
      setCategoriesMessage({
        variant: 'success',
        message: 'Danh mục được thêm thành công!',
      })
      window.location.reload();
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all categories
  const getCategories = async (limit, skip, keyword) => {
    try {
      setCategoriesLoading(true)
      const { data } = await axios.get('api/category/getAll', {
        params: { limit, skip, keyword},
      })
      setCategories(data.categories)
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

// Delete Category
const deleteCategory = async id  => {
  try {
    setCategoriesLoading(true)
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    const headers = {
      Authorization: `Bearer ${userToken && userToken}`,
      'Content-Type': 'multipart/form-data',
    }
    const { data } = await axios.delete(`/api/category/${id}`, { headers })
    setCategoriesLoading(false)
    setCategoriesError(null)
    setCategoriesMessage({
      variant: 'success',
      message: 'Xóa thành công!',
    })
    window.location.reload();
    return data.categories
  } catch (err) {
    errorHandler(err, 'Không tìm thấy sản phẩm')
  }
}

  // get one category
  const getOneCategory = async id => {
    try {
      const { data } = await axios.get(`/api/category/${id}`)
      return data.categories
    } catch (err) {
      errorHandler(err)
    }
  }

  const updateCategory = async (id, title) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setCategoriesLoading(true)
      await axios.patch(`api/category/${id}`, { title }, { headers })
      getCategories()
      setCategoriesMessage({
        variant: 'info',
        message: 'Danh mục được cập nhật',
      })
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoriesError,
        categoriesLoading,
        categoriesMessage,
        getCategories,
        addCategory,
        deleteCategory,
        getOneCategory,
        updateCategory,
      }}>
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryState
