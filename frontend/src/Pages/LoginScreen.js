import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div>
        {/* HEADER */}
        {/* <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-user" /> Blogen Admin
                </h1>
              </div>
            </div>
          </div>
        </header> */}
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* LOGIN */}
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={() => navigate('/adminDashboard')}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <input
                        type="submit"
                        defaultValue="Login"
                        className="btn btn-primary btn-block"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LoginScreen
