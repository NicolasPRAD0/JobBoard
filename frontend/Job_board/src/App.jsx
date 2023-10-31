import './App.css'

import { ToastContainer, toast } from 'react-toastify';

//router
import {BrowserRouter, Routes, Route} from'react-router-dom'


//react hooks
import { useContext, useEffect, useRef, useState } from 'react'

//contexts

//pages
import { LoginPage,LandingPage,RegisterPage,CreateOfferPage,ShowOfferRecruiterPage,EditOfferPage, RegisterCompanyPage, OfferApplicationPage, ShowOfferApplicantPage} from './pages'
import { NotifyContext } from './contexts/NotifyContext';
import RequireAuth from './auth/RequireAuth';
import AuthContext from './contexts/AuthContext';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashBoard from './pages/AdminDashBoard';

//components
import Companies from './admin/Companies';
import Users from './admin/Users';
import Offers from './admin/Offers';
import Applications from './admin/Applications';

function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState(null)
const toastId = useRef(null);

useEffect(()=>{

  if(localStorage.getItem("selected") && localStorage.getItem("isAuthenticated")){

    setUser(JSON.parse(localStorage.getItem(localStorage.getItem("selected"))));
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));

  }
  const presistAuthState = (e)=>{
    e.preventDefault()
  }
  window.addEventListener('beforeunload',presistAuthState)
    return(
      window.removeEventListener('beforeunload',presistAuthState)
    )
},[])

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<AuthContext.Provider value={{
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    }}>

<NotifyContext.Provider value={toastId}>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        //public routes
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/registerCompany' element={<RegisterCompanyPage/>} />

        <Route path='/createOffer' element={<CreateOfferPage/>} />
        <Route path='/showOfferRecruiter' element={<ShowOfferRecruiterPage/>}/>
        <Route path='/editOffer/:id' element={<EditOfferPage/>}/>
        <Route path='/offerApplication/:offerId' element={<OfferApplicationPage/>} />
        <Route path='/showOfferApplicant/:offerId' element={<ShowOfferApplicantPage/>} />
        
        <Route path='/adminBoard' element={<AdminDashBoard/>} >
          <Route path='companies' element={<Companies/>} />
          <Route path='users' element={<Users/>} />
          <Route path='offers' element={<Offers/>} />
          <Route path='applications' element={<Applications/>} />
        </Route>

        //protected routes
        <Route element={<RequireAuth/>}>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>

        </Route>
      </Routes>
      </BrowserRouter>
      </NotifyContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
