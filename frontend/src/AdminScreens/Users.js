import React, { useContext, useEffect } from 'react'
import Navbar from '../AdminComponents/Navbar'
import UserContext from '../context/user/UserContext'
// import Footer from '../AdminComponents/Footer'

const Users = () => {
  // for user context
  const uContext = useContext(UserContext)
  const { getAllUsers, allUsers } = uContext

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar />
      <div>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-warning text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-users" /> Users
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */}
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Users..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-warning">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* USERS */}
        <section id="users">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Users</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joining Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user, i) => (
                        <tr key={user._id}>
                          <td>{i + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{new Date(user.createdAt).toLocaleString()}</td>
                          <td>
                            <button
                              href="details.html"
                              className="btn btn-secondary"
                              disabled>
                              <i className="fas fa-angle-double-right" /> Action
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>All Admins</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joining Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>jdoe@gmail.com</td>
                        <td>
                          <a href="details.html" className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Users
