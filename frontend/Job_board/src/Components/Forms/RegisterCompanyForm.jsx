import React, { useState } from 'react'
import './Form.css'
import { createCompany } from '../../api/endpoints/companies'

const RegisterCompanyForm = () => {

  

    const [form, setForm] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
        logo: null,
    })

    
    const submitHandler = (e) =>{
        e.preventDefault()
        createCompany(form)
    }

    const handleDeleteClick =(e)=>{
      e.preventDefault()
        document.getElementById('logo').value = null
        setForm({...form, logo:null})
    }

  return (
    <form className="form_register" onSubmit={submitHandler}>
      <h1>Create Company</h1>
      <div className="input_container">
        <label htmlFor="companyEmail">Company Name</label>
        <input
          required
          type="text"
          id="companyName"
          name="companyName"
          className="input"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }
        }
        />
      </div>
      <div className="input_container">
        <label htmlFor="companyEmail">Company email</label>
        <input
          required
          type="email"
          id="companyEmail"
          name="companyEmail"
          className="input"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }
        }
        />
      </div>
      <div className="input_container">
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          className="input"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
      </div>
      <div className="input_container">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="input"
          onChange={(e) => {
            setForm({ ...form, confirmPassword: e.target.value });
          }}
        />
      </div>
      <div className="input_container">
        <label htmlFor="logo">Logo</label>
        <input
        accept=".png, .jpg, .jpeg .svg"
          required
          type="file"
          id="logo"
          name="logo"
          className="input"
          onChange={(e) => {
            setForm({ ...form, logo: e.target.files});
          }}
        />
        <button onClick={handleDeleteClick}>x</button>
      </div>
      <button>Create company</button>
      </form>
  )
}


export default RegisterCompanyForm