import React, { useState, useContext, useEffect } from 'react';
import { jobAppliance } from '../../api/endpoints/jobAppliance';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import AuthContext from '../../contexts/AuthContext';

const JobApplicationForm = (props) => {
  const navigate = useNavigate();
  const { offerId } = useParams()
  const { user } = useContext(AuthContext);;
  const [jobApplication, setJobApplication] = useState({
    applicantId: '',
    offerId: offerId,
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    message: '', 
  });

  useEffect(() => {
    if(offerId) {
      setJobApplication(prevState => ({ ...prevState, offerId: offerId }));
    }
  }, [offerId]);

  useEffect(() => {
    if (user?.uid) {
      setJobApplication(prevState => ({ 
        ...prevState, 
        applicantId: user.uid, 
        offerId: offerId
      }));
    }
  }, [user, offerId]);

  const onChange = (e) => {
    setJobApplication({ ...jobApplication, [e.target.name]: e.target.value });
  };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await jobAppliance(offerId, jobApplication);
      toast.success("Application successful!");
      navigate('/home');
    } catch (error) {
      console.error(error.message);
      toast.error("Error in applying to the offer. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input name='firstName' id='firstName' required value={jobApplication.firstName} onChange={onChange} />
      <label htmlFor="lastName">Last Name</label>
      <input name='lastName' id='lastName' required value={jobApplication.lastName} onChange={onChange} />
      <label htmlFor="email">Email</label>
      <input name='email' id='email' required value={jobApplication.email} onChange={onChange} />
      <label htmlFor="age">Age</label>
      <input type='number' name='age' required id='age' value={jobApplication.age} onChange={onChange} />
      <label htmlFor="message">Message</label>
      <textarea name="message" id="message" required value={jobApplication.message} onChange={onChange} />
      <button>Apply</button>
    </form>
  );
}

export default JobApplicationForm