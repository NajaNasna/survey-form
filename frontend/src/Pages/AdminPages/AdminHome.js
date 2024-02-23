import React from 'react'
import AdminNav from '../../Components/AdminComponents/AdminNavbar/AdminNav'
// import AdminSideNav from '../../Components/AdminComponents/AdminSideNavbar/AdminSideNav'

function AdminHome() {
  return (
    <div>
        <AdminNav/>
        <div className="container mt-4">

        <h1>WELCOME TO ADMIN PANEL</h1>
        </div>
    </div>
  )
}

export default AdminHome