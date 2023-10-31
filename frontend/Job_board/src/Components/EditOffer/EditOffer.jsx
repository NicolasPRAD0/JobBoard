import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit } from '../../api/endpoints/EditOffer';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function EditOffer(props) {
    const navigate = useNavigate();
    const [jobOffer, setJobOffer] = useState({
        jobTitle: '',
        companyName: '',
        contractType: 'CDI',
        summaryOffer: '',
        description: '',
        location: '',
        dateStart: '',
        requirements: '',
        wage: '',
    });

    const { id } = useParams();

    function sanitizeOfferData(data) {
        return {
            jobTitle: data.jobTitle || '',
            companyName: data.companyName || '',
            contractType: data.contractType || 'CDI',
            summaryOffer: data.summaryOffer || '',
            description: data.description || '',
            location: data.location || '',
            dateStart: data.dateStart ? new Date(data.dateStart).toISOString().split('T')[0] : "",
            requirements: data.requirements || '',
            wage: data.wage || '',
        };
    }

    useEffect(() => {
        fetch(`http://localhost:4000/offer/getById/${id}`)
            .then(response => response.json())
            .then(data => {
                const formattedData = sanitizeOfferData(data);
                setJobOffer(formattedData);
            })
            .catch(error => console.error('Error fetching job offer:', error));
    }, [id]);

    const onChange = (e) => {
        setJobOffer({ ...jobOffer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Edit(id, jobOffer);
            toast.success('Offer updated successfully!');
            navigate('/showOffer');
        } catch (error) {
            toast.error("Error in updating the offer. Please try again."); 
        }
    };

    return (
        <div>
            <h1>Edit Offer</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="jobTitle">Job Title </label>
            <input  name="jobTitle" id='jobTitle' required value={jobOffer.jobTitle} onChange={onChange}/>
            <label htmlFor="companyName">Company Name </label>
            <input  name="companyName" id='companyName' required value={jobOffer.companyName} onChange={onChange}/>
            <label htmlFor="contractType">Contract Type </label>
            <select name="contractType" id="contractType" required value={jobOffer.contractType} onChange={onChange}>
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
                <option>Interim</option>
                <option>Alternance</option>
            </select>
            <label htmlFor="summaryOffer">Summary Offer </label>
            <textarea name="summaryOffer" id="summaryOffer" maxLength={200} required value={jobOffer.summaryOffer} onChange={onChange}></textarea>
            <label htmlFor="description">Description </label>
            <textarea name="description" id="description" required value={jobOffer.description} onChange={onChange}></textarea>
            <label htmlFor="location">Location </label>
            <input  name="location" id='location' required value={jobOffer.location} onChange={onChange}/>
            <label htmlFor="dateStart">Date Start</label>
            <input  type='date' name="dateStart" id='date_Start' value={jobOffer.dateStart} onChange={onChange}/>
            <label htmlFor="requirements">Requirements </label>
            <textarea name="requirements" id="requirements" value={jobOffer.requirements} onChange={onChange}></textarea>
            <label htmlFor="wage">Wage </label>
            <input type='number' name="wage" id='wage' value={jobOffer.wage} onChange={onChange}/>
            <button>Update Offer</button>
            </form>
        </div>
    );
}

export default EditOffer;