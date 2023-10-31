import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import "./profilePage.css";
import {toast} from 'react-toastify'

import EditableInput from "../Components/EditableInput/EditableInput";
import {
  addRecruiter,
  editCompany,
  getRecruiters,
} from "../api/endpoints/companies";
import DropDownSelect from "../Components/DropdownSelect/DropDownSelect";
import { editUser } from "../api/endpoints/user";

const CompanyProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [recruiters, setRecruiters] = useState(null);
  const [newRecruiter, setnewRecruiter] = useState("");

  useEffect(() => {
    getRecruiters(user.uid).then((res) => setRecruiters(res));
  }, []);

  const handleDeleteRecruiter = async (e)=>{
    if(confirm('Are you sure you want to delete this recruiter?')){

      const res = await addRecruiter({
        company: "",
        companyId: "",
        userId: e.target.parentNode.id,
      })

      if(res){
        setRecruiters(recruiters.filter(recruiter => recruiter._id !== e.target.parentNode.id))
      }
    }
  }

  const handleAddRecruiter = async (e) => {
    if (newRecruiter !== "") {
      let alreadyExists =false;
      recruiters?.map(recruiter =>{
        if(recruiter.email == newRecruiter){
          alreadyExists = true;
        }
      })
      if(alreadyExists)return toast.error("Already in your recruiters")

      const res = await addRecruiter({
        userEmail: newRecruiter,
        company: user.name,
        companyId: user.uid,
      });
      if (res) {
        setRecruiters(prevState => {
           let newArr = Array.from(recruiters)
          newArr.unshift(res)
          return newArr
        })

      }
    }
  };

  const saveCallback = async (value, field) => {
    let res;
    console.log(field);
    if (field == "password") {
      let confirmPassword = prompt("Confirm new password");
      if (confirmPassword == value) {
        res = await editCompany({ value: value, field: field, id: user.uid });
      }
    }

    res = await editCompany({ value: value, field: field, id: user.uid });

    if (res) {
      setUser(res);
      localStorage.setItem("company", JSON.stringify(res));
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <h1>Company account</h1>
      <h2>Info</h2>
      <EditableInput
        value={user.name}
        type="string"
        label="Name"
        id="name"
        name="name"
        saveCallback={saveCallback}
      />
      <EditableInput
        value={user.email}
        type="email"
        label="Email"
        id="email"
        name="email"
        saveCallback={saveCallback}
      />

      <EditableInput
        value={""}
        type="password"
        label="Change password"
        id="password"
        name="password"
        saveCallback={saveCallback}
      />
      <h2>Recruiters</h2>

      <div>
        <input
          type="email"
          onChange={(e) => {
            setnewRecruiter(e.target.value);
          }}
        />
        <button onClick={handleAddRecruiter}>Add new recruiter</button>
      </div>
      <ul>
        {recruiters?.map((recruiter) => {
          return (
            <div key={recruiter._id} id={recruiter._id}>
              <div>{recruiter.name}</div>
              <div>{recruiter.lastName}</div>
              <div>{recruiter.email}</div>
              <button onClick={handleDeleteRecruiter}>Revoke</button>
            </div>
          );
        })}
      </ul>

      {/* <DropDownSelect
    >

    </DropDownSelect> */}
      {/* {recruiters ?
    recruiters.map(recruiter =>{
      return <div>{recruiter.name}</div>
    })  
    :
    null
  } */}
    </div>
  );
};

export default CompanyProfilePage;
