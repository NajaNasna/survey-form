import axios from 'axios';
import React,{useEffect, useRef, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {

  const textInput = useRef(null)
  const [credentials, setCredentials] = useState({  adminEmail: "", adminPassword: "" })
  let navigate = useNavigate()


const handleSubmit = async(e) =>{
  e.preventDefault();
  // console.log(credentials.adminEmail,credentials.adminPassword)
  const body = {adminEmail: credentials.adminEmail , adminPassword: credentials.adminPassword}
  const response = await axios.post('http://localhost:5000/adminlogin',body
  )
console.log(response)

  const json = await response.json()
  console.log(json)

  if(!json.success){
    alert("Enter valid credentials")
  }

  if(json.success){
    localStorage.setItem("userEmail",credentials.email)
    localStorage.setItem("authToken",json.authToken)
    console.log(localStorage.getItem("authToken"))
    navigate('/dashboard')
  }

}

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  useEffect(()=>{
   textInput.current.focus() 
  },[])


  return (
    <div>
      <div className="container">
      <form onSubmit={handleSubmit}>
      <h1 className='text-center mt-4'><strong>LOGIN</strong></h1>
  <div className="form-group mt-5">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
    name='adminEmail' value={credentials.adminEmail} onChange={onChange} ref={textInput} autoComplete='off'/>
  </div>
  <div className="form-group mt-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control " placeholder="Password" name='adminPassword'
     value={credentials.adminPassword} onChange={onChange}/>
  </div>
  
 
  <button type="submit" className="btn btn-primary mt-3">Submit</button>
  <Link to={'/admin-signup'} className='btn btn-danger mt-3 mx-5'>I'm a new User</Link>
</form>
      </div>
    </div>
  )
}

export default Login