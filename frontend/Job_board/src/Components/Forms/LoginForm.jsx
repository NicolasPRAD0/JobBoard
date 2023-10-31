import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../contexts/AuthContext";
import "./form.css";
import { loginUser } from "../../api/endpoints/login";

import { useNavigate } from "react-router-dom";
import { loginCompany } from "../../api/endpoints/companies";
const LoginForm = (props) => {
  const {user,setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    company:false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    let res
    if(form.company){
      res = await loginCompany(form);
      if(res.status == 200){
        console.log(res)
        const result = await res.json()

        
      setUser(result);
      setIsAuthenticated(true);
      localStorage.setItem("company",JSON.stringify(result));
      localStorage.setItem("selected","company");
      localStorage.setItem("isAuthenticated",true);
      navigate('/home');

      }
    }
    else{

    res = await loginUser(form);

    if(res.status == 200){
      const response = await res.json()
      setUser(response);
      setIsAuthenticated(true)
      localStorage.setItem("user",JSON.stringify(response)
      ); 
      localStorage.setItem("selected","user");
      localStorage.setItem("isAuthenticated",true);
      navigate('/home');
    }

    }
  };

  return (
    <form className="form_register" onSubmit={submitHandler}>
      <h1>Log In</h1>
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
        <label htmlFor="company">Logging in as Company ?</label>
        <input
          type="checkbox"
          id="company"
          name="company"
          className="input"
          onChange={(e) => {
            setForm({ ...form, company: !form.company });
          }}
        />
      </div>
      <button>Log In</button>
      <a
        className="link"
        onClick={() => {
          navigate("/register");
        }}
      >
        No account yet? Create one here
      </a>
    </form>
  );
};

export default LoginForm;