import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from '../context/category/categoryContext'
import productContext from '../context/product/productContext'
import Loader from '../components/Loader'
import axios from 'axios'

const AddProductModal = () => {
  // for product context
  const pContext = useContext(productContext)
  const { addProduct, errorHandler } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line
  }, [])

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    description: '',
  })

  const [image, setImage] = useState('')

  const [uploading, setUploading] = useState(false)

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (err) {
      errorHandler(err, 'Could not upload file')
      setUploading(false)
    }
  }

  const handleAddproduct = e => {
    // e.preventDefault()
    const { name, sku, category, price, description } = product
    console.log(image, 'Add product to run')
    addProduct(name, sku, category, price, description, image)
    console.log('Add product ran')
    setProduct({
      name: '',
      sku: '',
      category: '',
      price: '',
      description: '',
    })
    setImage('')
  }

  return (
    <>
      {/* ADD POST MODAL */}
      <div
        style={{ zIndex: '9999' }}
        className="modal fade"
        id="addProductModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Product</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={product.name}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sku">SKU</label>
                <input
                  type="text"
                  name="sku"
                  onChange={handleChange}
                  value={product.sku}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  name="category"
                  onChange={handleChange}>
                  <option value>Select Category</option>
                  {categories.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Pirce</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={product.price}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={handleChange}
                  value={product.description}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    onChange={uploadFileHandler}
                    name="image"
                    value={image}
                  />
                  {uploading && <Loader />}
                  <label htmlFor="image" className="custom-file-label">
                    Choose File
                  </label>
                </div>
                <small className="form-text text-muted">Max Size 3mb</small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleAddproduct}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProductModal
