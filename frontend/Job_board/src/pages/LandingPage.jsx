import React, { useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'


const LandingPage = () => {
    const navigate = useNavigate()
    const {user, isAuthenticated} = useContext(AuthContext)
    console.log(user)
  return (
    <div>
    <div>Welcome to!</div>

    <button onClick={()=>{navigate('/login')}}>Login</button>
    <button onClick={()=>{navigate('/register')}}>Register</button>
    {user?.recruiter ? 
    <button onClick={()=>{navigate('/createOffer')}}>Create Offer</button>
    :
    null}
    {user?.recruiter ?
    <button onClick={()=>{navigate('/showOfferRecruiter')}}>Show Offers</button>
    :
    null
    }

    </div>
  )
}

export default LandingPage