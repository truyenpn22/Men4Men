import React, { useContext, useEffect } from 'react'
import Navbar from '../AdminComponents/Navbar'
// import Footer from '../AdminComponents/Footer'
import AddProductModal from '../AdminComponents/AddProductModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'
import AddUserModal from '../AdminComponents/AddUserModal'
import { Link } from 'react-router-dom'
import productContext from '../context/product/productContext'

const AdminDashboard = () => {
  // for product context
  const pContext = useContext(productContext)
  const { getProducts, products } = pContext

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-cog" />
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addProductModal">
                  <i className="fas fa-plus" /> Add Porduct
                </a>
              </div>

              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Add Category
                </a>
              </div>

              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-warning btn-block"
                  data-toggle="modal"
                  data-target="#addUserModal">
                  <i className="fas fa-plus" /> Manage Users
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */}
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Products</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, i) => (
                        <tr key={product._id}>
                          <td>{i + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            {new Date(product.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <a href="/" className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" />{' '}
                              Details
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>Products</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt" /> {products.length}
                    </h4>
                    <Link
                      to="/products"
                      className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Categories</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder" /> 4
                    </h4>
                    <Link
                      to="/categories"
                      className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Users</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users" /> 4
                    </h4>
                    <Link to="/users" className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}

      <div>
        <AddProductModal />

        <AddCategoryModal />

        <AddUserModal />
      </div>
    </div>
  )
}

export default AdminDashboard
