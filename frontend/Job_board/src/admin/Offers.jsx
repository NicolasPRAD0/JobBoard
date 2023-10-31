import React, { useEffect, useState } from "react";
import { getAllOffers } from "../api/endpoints/offers";
import DocContainer from "../Components/DocContainer/DocContainer";

const Offers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllOffers().then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, []);
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' , gap:'2vh'}}> 
      <h1>Offers</h1>
      {data?.map((element) => {
        return <DocContainer element={element} />;
      })}
    </div>
  );
};

export default Offers;
