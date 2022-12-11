import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../AdminComponents/Navbar'

// import Footer from '../AdminComponents/Footer'
import CategoryContext from '../context/category/categoryContext'
import EditCategoryModal from '../AdminComponents/EditCategoryModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'

const Categories = () => {
  const context = useContext(CategoryContext)
  const { categories, getCategories, deleteCategory } = context
  const limit = 3

  const [skip, setSkip] = useState(0)
  const [keyWord, setKeyWord] = useState('')
  const [totalResults,setTotalResults] = useState(0)
  // const [categoryArray, setCategoryArray] = useState(categories)

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getCategories(limit, skip, keyWord))
    }
    populateProducts()
    // getCategories()
    // eslint-disable-next-line
  }, [skip, limit])

  //delete catagory
  const deleteSaveChanges = (id) => {
    // console.log(product)
    deleteCategory(id)
  }

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
  }

  const handleNextClick = async () => {
    setSkip(skip + limit)
  }

  const handleChange = e => {
    setKeyWord(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    const populateProducts = async () => {
      setTotalResults(await getCategories(limit, skip, keyWord))
    }
    setSkip(0)
    populateProducts()
  }

  return (
    <div>
      <Navbar />

      <div>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-success text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> Categories
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
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Add New Category
                </a>
                <AddCategoryModal />
              </div>
              <div className="col-md-6 ml-auto">
              <form onSubmit={handleSearchSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Categories..."
                    value={keyWord}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-success" type='submit'>Search</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* CATEGORIES */}
        <section id="categories">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Categories</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, i) => (
                        <tr key={category._id}>
                          <td>{i + 1}</td>
                          <td>{category.title}</td>
                          <td>
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {/* <button className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" />{" "}
                              Details
                            </button> */}
                            <EditCategoryModal category={category} />
                            <Button variant="danger" className="mx-2" onClick={() => deleteSaveChanges(category._id)}>
                              <i className="fas fa-trash" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="row mx-3">
                  <div className="col-md-12 text-center">
                    <div className="d-flex justify-content-between align-items-center my-3">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handlePreviousClick}
                        disabled={skip < 1}>
                        &larr; Previous
                      </Button>

                      <div className="text-center mx-2">
                        Page-{skip / limit + 1},
                        <span className="text-muted">
                          {' '}
                          Showing {categories.length} out of {totalResults}{' '}
                          products.
                        </span>
                      </div>

                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleNextClick}
                        disabled={totalResults - skip <= limit}>
                        Next &rarr;
                      </Button>
                    </div>
                  </div>
                </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Categories
