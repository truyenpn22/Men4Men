import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddProductModal from '../AdminComponents/AddProductModal'
import Navbar from '../AdminComponents/Navbar'
import productContext from '../context/product/productContext'
// import Footer from '../AdminComponents/Footer'

const Products = () => {
  // for product context
  const pContext = useContext(productContext)
  const { getProducts, products } = pContext

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar />
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt" /> Products
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/* SEARCH */}
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a
                href="/"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#addProductModal">
                <i className="fas fa-plus" /> Add Porduct
              </a>
              <AddProductModal />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Products..."
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products */}
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col">
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
                          <Link
                            to={`/productDetailsAdmin/${product._id}`}
                            className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a href="/" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="/" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="/" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="/" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="/" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  )
}

export default Products
