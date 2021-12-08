import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

const ProfileScreen = () => {
  const [user, setUser] = useState({ name: '', email: '' })

  // for product context
  const uContext = useContext(UserContext)
  const { readProfile } = uContext

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = await readProfile()
      console.log(userInfo)
      setUser(userInfo)
    }
    fetchProfile()
  }, [])

  return (
    <>
      {/* ACTIONS */}
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to="/" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left" /> Back to Home
              </Link>
            </div>
            <div className="col-md-4">
              <a href="#" className="btn btn-success btn-block">
                <i className="fas fa-lock" /> Change Password
              </a>
            </div>
            <div className="col-md-4">
              <a href="#" className="btn btn-danger btn-block">
                <i className="fas fa-trash" /> Delete Account
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* PROFILE */}
      <section id="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4>Edit Profile</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue="test@test.com"
                        value={user.email}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                      className="form-control"
                      name="editor1"
                      defaultValue={
                          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid '
                        }
                        />
                    </div> */}
                    <div className="form-group">
                      <input
                        value="save changes"
                        type="submit"
                        className="btn btn-dark btn-block"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Your Avatar</h3>
              <img
                src="img/avatar.png"
                alt=""
                className="d-block img-fluid mb-3"
              />
              <button className="btn btn-primary btn-block">Edit Image</button>
              <button className="btn btn-danger btn-block">Delete Image</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileScreen
