import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import './page.css'

const AdminDashBoard = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

  return user?.isAdmin ?
  <div className='page_container'>
    <nav className='nav_menu'>
        <h2>Dashboards</h2>
        <div className='nav_item' onClick={()=>{navigate('companies')}}>Companies</div>
        <div className='nav_item' onClick={()=>{navigate('users')}}>Users</div>
        <div className='nav_item' onClick={()=>{navigate('applications')}}>Applications</div>
        <div className='nav_item' onClick={()=>{navigate('offers')}}>Offers</div>
    </nav>
    <Outlet/>
  </div>
    :
    <>
    {navigate('/home')}
    null
    </>
  
}

export default AdminDashBoard