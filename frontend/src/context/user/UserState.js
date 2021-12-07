import UserContext from './UserContext'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

const UserState = props => {
  //fort navigate
  const navigate = useNavigate()

  // axios config
  const userToken = JSON.parse(localStorage.getItem('userToken'))
  const headers = {
    Authorization: `Bearer ${userToken || ''}`,
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [user, setUser] = useState(userInfo || null)
  const [userError, setUserError] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userMessage, setUserMessage] = useState(null)

  //   for disabling the alert messages after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {
      setUserError({
        variant: 'danger',
        message: `${info} ${err.response.data.error}`,
      })
    } else if (err.request) {
      setUserError({
        variant: 'danger',
        message: `${info} No response from server`,
      })
    } else {
      setUserError({ variant: 'danger', message: err.message })
    }
    setUserLoading(false)
  }

  // -----------------------------------------------------------------
  // Login user
  // -----------------------------------------------------------------
  const login = async (email, password) => {
    try {
      setUserLoading(true)
      const { data } = await axios.post(`api/users/login`, {
        email,
        password,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Logged In successfully' })
      navigate('/')
      //   history.push('/')
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Signup a new user
  // -----------------------------------------------------------------
  const signup = async (name, email, password) => {
    try {
      const body = clean({ name, email, password })
      setUserLoading(true)
      const { data } = await axios.post(`api/users/register`, body)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Signed up successfully' })
      navigate('/')
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Logout a user
  // -----------------------------------------------------------------
  const logout = async () => {
    try {
      setUserLoading(true)
      // await axios.post(`api/users/logout`, null, {
      //   headers,
      // })
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'dark', message: 'You have logged out!' })
      navigate('/login')
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Read user profile
  // -----------------------------------------------------------------
  const readProfile = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('api/users/me', { headers })
      setUserError(null)
      setUserLoading(false)
      return data
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Edit Profile
  // -----------------------------------------------------------------
  // const editProfile = async (name, email, age, password) => {
  //   try {
  //     setUserLoading(true)
  //     const body = clean({ name, email, age, password })
  //     const { data } = await axios.patch('api/users/me', body, { headers })
  //     setUser(data)
  //     localStorage.setItem('userInfo', JSON.stringify(data))
  //     setUserError(null)
  //     setUserLoading(false)
  //     setUserMessage({
  //       variant: 'success',
  //       message: 'Your profile was updated successfully',
  //     })
  //     return data
  //   } catch (err) {
  //     errorHandler(err, 'Could not update your profile!')
  //   }
  // }

  // -----------------------------------------------------------------
  // Delete Profile
  // -----------------------------------------------------------------
  // const deleteProfile = async () => {
  //   try {
  //     setUserLoading(false)
  //     await axios.delete('api/users/me', { headers })
  //     localStorage.removeItem('userInfo')
  //     setUser(null)
  //     setUserError(null)
  //     setUserLoading(false)
  //     setUserMessage({ variant: 'danger', message: 'Profile deleted' })
  //     navigate('/login')
  //   } catch (err) {
  //     errorHandler(err)
  //   }
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        userError,
        userLoading,
        userMessage,
        login,
        signup,
        logout,
        readProfile,
        // editProfile,
        // deleteProfile,
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
