import React from 'react'
import './AdminNav.css'
import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <div className='admin-nav'>
      <nav class="navbar navbar-expand-lg navbar-light">
      <div className="container">

  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{display:"flex", justifyContent:"space-between"}}>
    <ul class="navbar-nav mr-auto py-3 d-flex mx-auto" style={{display:"flex",justifyContent:"space-around"}}>
      {/* <li class="nav-item active me-5">
        <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
      </li> */}
      <Link to={'/dashboard'}><li class="nav-item me-5 text-dark">
        Dashboard
      </li></Link>
      <Link to={'/owner-contacts'}>
      <li class="nav-item me-5 text-dark">
        Owners Contact Details
      </li></Link>
      <li class="nav-item me-5 text-dark">
        Suppliers Contact Details
      </li>
      <li class="nav-item me-5 text-dark">
        Survey Details
      </li>  
      
    </ul>
  </div>
  </div>
</nav>
    </div>
  )
}

export default AdminNav