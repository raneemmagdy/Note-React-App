import React from 'react'
import image from '../../Assets/images.png'
export default function Notfound() {
  return (
    <>
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Not Found Page</h1>
    <img src={image} alt="404"  />
    </div>
    
    </>
  )
}
