import React from 'react'
import './App.css'
import Home from './Components/UserComponents/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Choose from './Components/UserComponents/Choose/Choose'
import AdminHome from './Pages/AdminPages/AdminHome'
import AdminSignup from './Components/AdminComponents/AdminSignup/AdminSignup'
import AdminLogin from './Components/AdminComponents/AdminLogin/AdminLogin'
import OwnerContacts from './Components/AdminComponents/OwnerContacts/OwnerContacts'

function App() {
  return (
    <div>

<Router>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/choose' element={<Choose/>}/>
    <Route path='/admin-signup' element={<AdminSignup/>}/>
    <Route path='/admin' element={<AdminLogin/>}/>
    <Route path='/dashboard' element={<AdminHome/>}/>
    <Route path='/owner-contacts' element={<OwnerContacts/>}/>

  </Routes>
</Router>



      
    </div>
  )
}

export default App
