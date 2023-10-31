// React hooks
import React, { useContext, useEffect, useRef, useState} from 'react'

//css
import './rightMenu.css'
//svgs
import MenuSVG from '../../assets/icons/menu.svg?react';
import ProfileSVG from '../../assets/icons/profile.svg?react'
import SettingsSVG from '../../assets/icons/settings.svg?react'
import LogoutSVG from '../../assets/icons/log-out.svg?react'
import BoardSVG from '../../assets/icons/board.svg?react'
import ClipboardSVG from '../../assets/icons/clipboard.svg?react'
//contexts
import AuthContext from '../../contexts/AuthContext';
import Button from "../Buttons/Button";
import { useNavigate } from 'react-router-dom';


const RightMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {user,setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate()
  const ref = useRef()

  const handleLogOut=(e) =>{
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");;
    setIsAuthenticated(false)
    setUser(null)
    navigate('/')
}

useEffect(()=>{
    const handleClick =(e)=>{
        if(ref.current && !ref.current.contains(event.target)){
            setIsOpen(false)
        }
    }
    window.addEventListener('click',handleClick)
    return ()=>{
        window.removeEventListener('click',handleClick)
    }
},[])

  return (
    <div ref={ref} className="menu_container">
    <Button className='button_square' onClick={()=>{setIsOpen(!isOpen)}}>
        <MenuSVG/>
    </Button>
    {isOpen ?
        <div className="menu">
          <div onClick={()=>navigate('/profile')} className="menu_item"><ProfileSVG/> Profile</div>
          {user?.recruiter?
          <div onClick={()=>navigate('/showOfferRecruiter')} className="menu_item"><ClipboardSVG/>My Offers</div>
          :
          <div onClick={()=>navigate(`/showOfferApplicant/${user.uid}`)} className="menu_item"><ClipboardSVG/>My Applications</div>

        }
          <div onClick={handleLogOut} className="menu_item"><LogoutSVG/> Log out</div>

          {user.isAdmin ?
              <div onClick={()=>navigate('/adminBoard')} className="menu_item"><BoardSVG/> Admin dashboard</div>
              :
              null
          }
      </div>
      :
        null
    }
</div>
        )

};

export default RightMenu;
