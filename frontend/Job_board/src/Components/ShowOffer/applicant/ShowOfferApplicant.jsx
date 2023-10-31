import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../homepage/job-offer-card.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import logo from '../../../assets/logo.png';
import AuthContext from '../../../contexts/AuthContext';

const ShowOfferApplicant = () => {
  const [jobOffer, setJobOffer] = useState([]);
  const [detailedJobOffer, setDetailedJobOffer] = useState("");
  const [expandedOffers, setExpandedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user?.uid) {
      setError("User not authenticated");
      return;
    }
    fetch(`http://localhost:4000/offer/offerApplied/${user?.uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const applicationData = await res.json();
          const offerPromises = applicationData.map(application => 
              fetch(`http://localhost:4000/offer/getById/${application.offerId}`)
          );
          const offerResponses = await Promise.all(offerPromises);
          const offersData = await Promise.all(offerResponses.map(res => res.json()));

          setJobOffer(offersData);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch offers');
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  const getDetailedOffer = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/offer/getById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
          const detailedData = await res.json();
          if (detailedData.dateStart) {
              detailedData.dateStart = new Date(detailedData.dateStart).toISOString().split('T')[0];
          }
          setDetailedJobOffer(detailedData);
      } 
      else {
          throw new Error('Failed to fetch detailed offer info');
      }
    } 
    catch (err) {
          toast.error("Error in fetching details. Please try again.");
    }
  }

  const handleToggleDetails = async (offer) => {
    if (expandedOffers.includes(offer._id)) {
      setExpandedOffers(expandedOffers.filter((id) => id !== offer._id));
      setDetailedJobOffer(""); 
    } 
    else {
      await getDetailedOffer(offer._id);
      setExpandedOffers([...expandedOffers, offer._id]);
    }
  };
  const handleApply = async (offerId) => {
    navigate(`/offerApplication/${offerId}`);
  };

  return (
    <div>
      <img src={logo} alt="Company Logo" style={{ position: 'absolute', top: '10px', left: '10px', height: '50px' }} />
      <h1>Show Offers</h1>
      <div className="job-offer-cards">
        {jobOffer.map((offer) => (
          <div key={offer._id} className="job-offer-card">
            {/* <div> */}
              <div className="job-details-container">
                <h2>{offer.jobTitle}</h2>
                  <p>{offer.companyName}</p>
                  <p>{offer.contractType}</p>
              {/* </div> */}
              <p>{offer.summaryOffer}</p>
            
            <button onClick={() => handleToggleDetails(offer)}>
              {expandedOffers.includes(offer._id) ? 'Show Less' : 'Show More'}
            </button>
            </div>
            {expandedOffers.includes(offer._id) && detailedJobOffer && detailedJobOffer._id === offer._id && (
              <div className="show-more-content">
                <p><strong>Description:</strong> {detailedJobOffer.description}</p>
                <p><strong>Location:</strong> {detailedJobOffer.location}</p>
                <p><strong>Date of Start:</strong> {detailedJobOffer.dateStart || 'Not specified'}</p>
                <p><strong>Requirements:</strong> {detailedJobOffer.requirements || 'Not specified'}</p>
                <p><strong>Wage:</strong> {detailedJobOffer.wage || 'Not specified'}</p>
                {isAuthenticated && !user.recruiter && (
                  <button onClick={() => handleApply(offer._id)}>Apply</button>
                )}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowOfferApplicant;