import React, { createContext, useEffect, useRef, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Choose from '../Choose/Choose'


export const userContext = createContext()

function Home() {

  const[compName, setCompName] = useState('')
  const[contName, setContName] = useState('')
  const[contEmail, setContEmail] = useState('')
  const[phone, setPhone] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(false)
  const inputRef = useRef(null)
  const location = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const body = {compName, contName, contEmail, phone}
    // console.log(body)
    const response = await axios.post('http://localhost:5000/signup',body)
    console.log(response)

    if(response.data.success){
      localStorage.setItem('email',response.data.result.contEmail)
      location('/choose')
    }
  }

  useEffect(()=>{
    inputRef.current.focus()
  },[])


  return (
    <div className='bg'>
      
      <div className="container">
        <div className="content-div">
        <form>
        <h2 className="text-center mb-5">Business Survey</h2>
                        <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
                          <label  className="form-label fw-bold">Company Name</label>
                          <input type="name" name='companyName' ref={inputRef} value={compName} onChange={(e)=>setCompName(e.target.value)}  className="form-control" placeholder=" Company Name" />
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
                            <label  className="form-label fw-bold">Contact Name</label>
                            <input type="name" name='contactName' value={contName} onChange={(e)=>setContName(e.target.value)} className="form-control" placeholder=" Contact Name" />
                          </div>
                          <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
                            <label  className="form-label fw-bold">Contact Email</label>
                            <input type="email" name='contactEmail' value={contEmail} onChange={(e)=>setContEmail(e.target.value)} className="form-control" placeholder=" Email"/>
                          </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
                          <label className="form-label fw-bold">Phone</label>
                          <input type="tel" name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" placeholder="Contact number"/>
                        </div>

                        <div className="quiz-btn-section">
                            <button type='submit' className="btn btn-primary quiz-btn" onClick={handleSubmit}>Next</button>
                        </div>
</form>
        </div>
      </div>
    </div>
    
  )
}

export default Home
