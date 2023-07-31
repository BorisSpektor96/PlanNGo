import * as React from "react";
import { useEffect, useState } from 'react';
import Recommendation from './Recommendation';
import "./recommendations.css";

const Recommendations = () => {
  const [listOfBusinesses, setListOfBusinesses] = useState([]);

  const fetchBusinessesArr = async () => {
    try {
      let response = await fetch('http://localhost:3001/business/getAllUsersBusiness', {
        method: "get",
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedBusiness = [];

      for (const key in data) {
        loadedBusiness.push({
          id: data[key]._id,
          business_name: data[key].business_name,
          phoneNumber: data[key].phoneNumber,
          address: data[key].address,
        });
      }
      setListOfBusinesses(loadedBusiness.slice(0, 6)); // Limit the businesses to 5

    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    fetchBusinessesArr();
  }, []);

  return (
    <div className=" ">
      <hr />
      <p className="text-center display-7 text-muted p-1 ">Customers with similar interests also explored:</p>
      <hr />
      <div className="sample_container card_sample d-flex flex-row">
        {/* Render a Recommendation component for each business */}
        {listOfBusinesses.map((business) => (
          <Recommendation key={business.id} business={business} />
        ))}
      </div>
      <hr/>
    </div>
  );
};

export default Recommendations;