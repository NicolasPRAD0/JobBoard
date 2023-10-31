import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import ShowOfferHome from '../Components/ShowOffer/homepage/ShowOfferHome'; // Corrected component name

const HomePage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  console.log(user);

  return (
    <ShowOfferHome />
  );
}

export default HomePage;