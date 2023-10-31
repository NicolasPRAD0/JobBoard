import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./form.css";
import { registerUser } from "../../api/endpoints/register";
import { useNavigate } from "react-router-dom";
import DropDownSelect from "../DropdownSelect/DropDownSelect";

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    birthDate: "",
    recruiter: false,
    company: "",
    

  });

  const submitHandler = async (e) => {
    e.preventDefault();
    registerUser(form);
  };
  return (
    <div>
      <form className="form_register" onSubmit={submitHandler}>
        <h1>Register</h1>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="input"
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
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
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className="input"
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            type="text"
            id="lastName"
            name="lastName"
            className="input"
            onChange={(e) => {
              setForm({ ...form, lastName: e.target.value });
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="birthDate">Date of birth</label>
          <input
            required
            type="date"
            id="birthDate"
            name="birthDate"
            className="input"
            onChange={(e) => {
              setForm({ ...form, birthDate: e.target.value });
            }}
          />
        </div>
        <a onClick={() => navigate("/registerCompany")}>
          Can't find your company ? Create a company account here
        </a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default RegisterForm;
