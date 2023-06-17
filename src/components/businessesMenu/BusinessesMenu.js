import { useEffect, useState } from "react";
// import styles from "./BusinessesMenu.module.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "../forms/SearchBar";
import BusinessFormat from "./BusinessFormat";

const BusinessesMenu = () => {

  const [ listOfBusinesses, setListOfBusinesses ] = useState([]);

  const fetchBusinessesArr = async (e) => {

    try {
      let response = await fetch('http://localhost:3000/business/userBusiness',
        {
          method: "get",
          // body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedBusiness = [];

      for (const key in data) {
        loadedBusiness.push({
          id: data[ key ]._id,
          businessName: data[ key ].business_name,
          fullname: data[ key ].fullname,
          tel: data[ key ].business_phone,
          email: data[ key ].business_email,
          address: data[ key ].address,
          service: data[ key ].business_type,
          isBusiness: data[ key ].isBusiness,
          businessDescription: data[ key ].business_description
        });
      }

      setListOfBusinesses(loadedBusiness);

    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    console.log("fetch");
    fetchBusinessesArr();
  }, []);

  useEffect(() => {
    const logTimeout = setTimeout(() => {
      console.log("listOfBusinesses");
      console.log(listOfBusinesses);
      setFilteredBusinesses(listOfBusinesses)
    }, 200);

    return () => clearTimeout(logTimeout);
  }, [ listOfBusinesses ]);

  const [ filteredBusinesses, setFilteredBusinesses ] = useState(listOfBusinesses);
  const [ filterName, setFilterName ] = useState('');
  const [ filterService, setFilterService ] = useState('');
  const [ filterLocation, setFilterLocation ] = useState('');
  const [ noResults, setNoResults ] = useState(false);

  const handleFilter = () => {
    const filtered = listOfBusinesses.filter((business) => {
      if (business.isBusiness) {
        const nameMatch = business.businessName.toLowerCase().includes(filterName.toLowerCase());
        const serviceMatch = business.service.toLowerCase().includes(filterService.toLowerCase());
        const locationMatch =
          filterLocation === '' || business.address.toLowerCase().includes(filterLocation.toLowerCase());

        return nameMatch && serviceMatch && locationMatch;
      }
    });

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
      setFilteredBusinesses(filtered);
    }
  };

  return (
    <>
      <SearchBar
        filterName={ filterName }
        filterService={ filterService }
        filterLocation={ filterLocation }
        setFilterName={ setFilterName }
        setFilterService={ setFilterService }
        setFilterLocation={ setFilterLocation }
        handleFilter={ handleFilter }
      />
      <div className="d-flex flex-column p-3">
        { noResults ? (
          <div>No businesses found based on the filter criteria.</div>
        ) : (
          filteredBusinesses.map(({ id, businessName, businessDescription, tel, email, address }) => (
            <BusinessFormat
              key={ id }
              id={ id }
              businessName={ businessName }
              businessDescription={ businessDescription }
              tel={ tel }
              email={ email }
              address={ address }
            />
          ))
        ) }
      </div>
    </>
  );
};

export default BusinessesMenu;
