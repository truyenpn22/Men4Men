import { useState } from "react"
import CategoryContext from "./categoryContext"
import axios from "axios"

// ------------------------------------------
// Category State
// ------------------------------------------
const CategoryState = props => {
  const [categories, setCategories] = useState([])

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

  // Add new category
  const addCategory = async (title, image) => {
    try {
      await axios.post("api/category/add", { title, image })
      setCategories([...categories, { title, image }])
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("api/category/getAll")
      console.log(data)
      setCategories(data.categories)
    } catch (err) {
      errorHandler(err)
    }
  }

  const updateCategory = async (id, title) => {
    try {
      await axios.patch(`api/category/${id}`, { title })
      getCategories()
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, getCategories, addCategory }}
    >
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryState
