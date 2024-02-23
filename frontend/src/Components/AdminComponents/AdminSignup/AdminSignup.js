import React, { useState } from 'react'
import AdminNav from '../AdminNavbar/AdminNav'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminSignup() {

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({  adminEmail: "", adminPassword: "" })


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials.adminEmail,credentials.adminPassword)
    const body = {adminEmail: credentials.adminEmail , adminPassword: credentials.adminPassword}
    const response = await axios.post('http://localhost:5000/adminsignup',body
    )
console.log(response)
setCredentials({ adminEmail: "", adminPassword: "" });
  }

  const onChange = (event) => {
    setCredentials({ ...credentials , [event.target.name]: event.target.value })
  }
  return (
    <div >
        <AdminNav/>

        
        <div className="container">
        <form onSubmit={handleSubmit} className='mt-5'>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
              name='adminEmail' value={credentials.adminEmail} onChange={onChange} autoComplete='off'/>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control " placeholder="Password" name='adminPassword'
              value={credentials.adminPassword} onChange={onChange} autoComplete='off'/>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <Link to={'/admin'} className='btn btn-danger mt-3 mx-5'>Already a User</Link>
        </form>
      </div>
        </div>
    
  )
}

export default AdminSignup