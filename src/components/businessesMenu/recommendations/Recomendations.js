import * as React from "react";
import { useEffect, useState } from 'react';
import Recommendation from './Recommendation';
import "./recommendations.css";

const Recommendations = (props) => {
  const [ filteredBusinesses, setFilteredBusinesses ] = useState([]);
  const [ listOfUsers, setListOfUsers ] = useState([]);
  const [ listOfbusinesses, setListOfbusinesses ] = useState([]);

  useEffect(() => {
    setFilteredBusinesses([])
    fetchUsersArr();
  }, [ props.currentBusiness ]);

  useEffect(() => {
    if (listOfUsers.length && listOfbusinesses.length) {

      /* filtering a list of users (listOfUsers) to find those who have visited a business identified by the props.currentBusiness email. */
      const usersWhoVisited = listOfUsers.filter(user => {
        return user.appointments.some(appointment => appointment.businessDetails.email === props.currentBusiness);
      });

      /* 
      initializes a businessVisitsMap as a JavaScript Map to count the number of visits each user made to businesses other than the props.currentBusiness.
       It iterates through usersWhoVisited, then for each user, iterates through their appointments.
        For each appointment, it extracts the businessDetails.email 
       and checks if it's different from the current business (props.currentBusiness). 
       If it's different, it updates the count in the map. 
      If the email is not yet in the map, it initializes the count to 1.
      */
      const businessVisitsMap = new Map();
      usersWhoVisited.forEach(user => {
        user.appointments.forEach(appointment => {
          const businessEmail = appointment.businessDetails.email;
          if (businessEmail !== props.currentBusiness) {
            if (businessVisitsMap.has(businessEmail)) {
              businessVisitsMap.set(businessEmail, businessVisitsMap.get(businessEmail) + 1);
            } else {
              businessVisitsMap.set(businessEmail, 1);
            }
          }
        });
      });
      /* Sort businesses by visit count in descending order
             takes the businessVisitsMap and converts it into an array of entries using Object.entries(). 
             Then, it converts that array back into an object with Object.fromEntries().
             Afterward, it sorts these entries in descending order based on the visit count, which is the second element of each entry (b - a sorts in descending order).
             Finally, it maps the sorted entries to extract the business email addresses in the order of their visit counts. 
             This gives you an array of business emails sorted by visit count.
       */

      const sortedBusinesses = Object.entries(Object.fromEntries(businessVisitsMap.entries()))
        .sort(([ , a ], [ , b ]) => b - a)
        .map(([ businessEmail ]) => businessEmail);

      const top5Businesses = sortedBusinesses.slice(0, 5); // Get the top 5 most visited businesses

      /*  sets the filteredBusinesses to contain only those businesses whose email addresses are found in the top5Businesses array.*/
      setFilteredBusinesses(listOfbusinesses.filter(business => top5Businesses.includes(business.email)));
    }
  }, [ listOfbusinesses ]);

  const fetchUsersArr = async () => {
    try {
      let response = await fetch('http://localhost:3001/users/getAllUsers', {
        method: "get",
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const filteredUsers = data.filter(user => !user.isBusiness);
      const filteredBusiness = data.filter(business => business.isBusiness);

      const listOfUsersWithIdAndAppointments = filteredUsers.map(user => ({
        id: user._id,
        appointments: user.appointments
      }));

      setListOfUsers(listOfUsersWithIdAndAppointments);
      setListOfbusinesses(filteredBusiness)
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <hr />
        <p className="text-center display-7 text-muted p-1 ">Customers with similar interests also explored:</p>
        { filteredBusinesses.length === 0 ?
          <div className="d-flex justify-content-center ">
            <lord-icon
              src="https://cdn.lordicon.com/xjovhxra.json"
              trigger="loop"
              colors="primary:#162ecc,secondary:#cc1616"
              styles="width:250px;height:250px">
            </lord-icon>
          </div>
          :
          <div className="sample_container card_sample d-flex flex-wrap justify-content-center gap-2">
            { filteredBusinesses.map((business) => (
              <Recommendation
                key={ business.id }
                { ...business }
              />
            )) }
          </div>
        }
        <hr />
      </div>
    </>
  );
};

export default Recommendations;