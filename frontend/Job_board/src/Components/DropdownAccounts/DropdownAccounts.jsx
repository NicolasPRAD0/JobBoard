import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './dropdownAccounts.css'
const DropdownAccounts = () => {
  const { user,setUser } = useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    setIsOpen(!isOpen)
  };

  const handleSelect =(e)=>{
    const email = JSON.parse(localStorage.getItem(e.target.id))?.email
    setSelectedAccount(email)
    setIsOpen(false)
    setUser(JSON.parse(localStorage.getItem(e.target.id)))
    localStorage.setItem("selected",e.target.id)


  }
  return (
    <div>
      <div className="selected" onClick={handleClick}>{user.name}</div>
      {isOpen ? (
        <div className="dropdown">
          <div id="user" className="item" onClick={handleSelect}>{JSON.parse(localStorage.getItem("user"))?.name}</div>
          <div id="company" className="item" onClick={handleSelect}>{JSON.parse(localStorage.getItem("company"))?.name}</div>
        <div onClick={()=>navigate('login')}>
            Connect to another account
          
        </div>
        </div>
      ) : null}
    </div>
  );
};

export default DropdownAccounts;
