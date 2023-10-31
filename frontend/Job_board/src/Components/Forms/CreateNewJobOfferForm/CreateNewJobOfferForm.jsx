import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewOffer } from "../../../api/endpoints/CreateNewOffer";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import AuthContext from '../../../contexts/AuthContext';
import '../Form.css'

const Form = (props) => {
  const navigate = useNavigate();
  const {user, isAuthenticated} = useContext(AuthContext)
  const [jobOffer,setJobOffer]=useState({
    jobTitle:'',
    companyName:'',
    contractType:'CDI',
    summaryOffer:'',
    location:'',
    dateStart:'',
    requirements:'',
    wage:'',
    creatorId:user?.uid,
    companyId:user?.companyId
  });

  const onChange = (e) => {
    setJobOffer({ ...jobOffer, [e.target.name]: e.target.value });
  };
 
   const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewOffer(jobOffer);
      toast.success("Offer created successfully!");
      navigate('/showOfferRecruiter');
    } catch (error) {
      toast.error("Error creating offer. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className='form_register'>
      <div className='input_container'>
      <label htmlFor="jobTitle">Job Title </label>
      <input  name="jobTitle" id='jobTitle' required value={jobOffer.jobTitle} onChange={onChange}/>
      </div>
      <div className='input_container'>
      <label htmlFor="companyName">Company Name </label>
      <input  name="companyName" id='companyName' required value={jobOffer.companyName} onChange={onChange}/>
      </div>
      <div className='input_container'>
      <label htmlFor="contractType">Contract Type </label>
      <select name="contractType" id="contractType" required value={jobOffer.contractType} onChange={onChange}>
        <option>CDI</option>
        <option>CDD</option>
        <option>Stage</option>
        <option>Interim</option>
        <option>Alternance</option>
      </select>
      </div>
      <div className='input_container'>
      <label htmlFor="summaryOffer">Summary Offer </label>
      <textarea name="summaryOffer" id="summaryOffer" maxLength={200} required value={jobOffer.summaryOffer} onChange={onChange}></textarea>
      </div>
      <div className='input_container'>

      <label htmlFor="description">Description </label>
      <textarea name="description" id="description" required value={jobOffer.description} onChange={onChange}></textarea>
      </div>
      <div className='input_container'>

      <label htmlFor="location">Location </label>
      <input  name="location" id='location' required value={jobOffer.location} onChange={onChange}/>
      </div>
      <div className='input_container'>

      <label htmlFor="dateStart">Date Start</label>
      <input  type='date' name="dateStart" id='date_Start' value={jobOffer.dateStart} onChange={onChange}/>
      </div>
      <div className='input_container'>

      <label htmlFor="requirements">Requirements </label>
      <textarea name="requirements" id="requirements" value={jobOffer.requirements} onChange={onChange}></textarea>
      </div>
      <div className='input_container'>
      <label htmlFor="wage">Wage </label>
      <input type='number' name="wage" id='wage' value={jobOffer.wage} onChange={onChange}/>
      </div>
      <button>Create Offer</button>
    </form>
  )
}

export default Form