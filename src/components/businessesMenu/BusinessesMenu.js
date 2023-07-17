import { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "../forms/SearchBar";
import BusinessFormat from "./BusinessFormat";

const BusinessesMenu = () => {

  const [ listOfBusinesses, setListOfBusinesses ] = useState([]);

  const fetchBusinessesArr = async (e) => {
    try {
      let response = await fetch('http://localhost:3001/business/getAllUsersBusiness',
        {
          method: "get",
          headers: { 'Content-Type': 'application/json' }
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
          business_name: data[ key ].business_name,
          fullname: data[ key ].fullname,
          tel: data[ key ].phoneNumber,
          email: data[ key ].email,
          address: data[ key ].address,
          service: data[ key ].business_type,
          isBusiness: data[ key ].isBusiness,
          businessDescription: data[ key ].businessDescription,
          services: data[ key ].services,
          products: data[ key ].products,
          businessGallery: data[ key ].business_photo_gallery,
          reviews: data[ key ].reviews
        });
      }
      setListOfBusinesses(loadedBusiness);
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    fetchBusinessesArr();
  }, [ listOfBusinesses.length == 0 ]);

  useEffect(() => {
    const logTimeout = setTimeout(() => {
      setFilteredBusinesses(listOfBusinesses)
    }, 100);

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
        const nameMatch = business.business_name.toLowerCase().includes(filterName.toLowerCase());
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
      <div className="d-flex flex-column col-12">
        { noResults ? (
          <div>No businesses found based on the filter criteria.</div>
        ) : (
          filteredBusinesses.map(({ id, business_name, businessDescription, tel, email, address, reviews }) => (
            <BusinessFormat
              key={ id }
              id={ id }
              business_name={ business_name }
              businessDescription={ businessDescription }
              tel={ tel }
              email={ email }
              address={ address }
              reviews={ reviews }
            />
          ))
        ) }
      </div>
    </>
  );
};

export default BusinessesMenu;
