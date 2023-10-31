import React, { useContext, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import './navbar.css'
import RightMenu from '../Menus/RightMenu'
import Button from '../Buttons/Button'
import MenuSVG from '../../assets/icons/menu.svg?react'
import HomeSVG from '../../assets/icons/home.svg?react'
import DropdownAccounts from '../DropdownAccounts/DropdownAccounts'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {user,setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const navigate = useNavigate()
    const handleLogOut=(e) =>{
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");;
        setIsAuthenticated(false)
        setUser(null)
        navigate('/')
    }


  return (

        <div className='navbar'>
        {isAuthenticated ? 
        <>
        <button onClick={()=>{navigate('/home')}}><HomeSVG/></button>
        <DropdownAccounts/>
        <RightMenu/>
        </>
        :
        <>
        {}
        <button onClick={()=>{navigate('/login')}}>Login</button>
        <button onClick={()=>{navigate('/register')}}>Register</button>
        <button onClick={()=>{navigate('/registerCompany')}}>Company</button>
        </>
        }
      </div>
      )
  
}

export default Navbar