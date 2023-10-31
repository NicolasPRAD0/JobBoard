import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../api/endpoints/user'
import AuthContext from '../contexts/AuthContext'
import UserProfilePage from './UserProfilePage'
import CompanyProfilePage from './CompanyProfilePage'

const ProfilePage = () => {


  return localStorage.getItem("selected") == "company" ?

    <CompanyProfilePage/>
    :
    <UserProfilePage/>

  
}

export default ProfilePage