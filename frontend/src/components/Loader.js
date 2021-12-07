import React from 'react'

const Loader = () => {
  return (
    <div
      className="loader"
      style={{
        width: '15vw',
        height: '15vw',
        margin: 'auto',
        display: 'block',
        position: 'fixed',
        top: '30%',
        left: '40%',
        zIndex: '10000',
      }}></div>
  )
}

export default Loader
