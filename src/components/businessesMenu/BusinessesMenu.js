import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "../forms/SearchBar";
import BusinessFormat from "./BusinessFormat";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useSelector } from "react-redux";

const BusinessesMenu = () => {

  const profileInfo = useSelector(state => state.profileInfo)

  const [ listOfBusinesses, setListOfBusinesses ] = useState([]);

  const [ loading, setLoading ] = useState(true)

  const fetchBusinessesArr = async () => {
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
          phoneNumber: data[ key ].phoneNumber,
          email: data[ key ].email,
          address: data[ key ].address,
          isBusiness: data[ key ].isBusiness,
          business_description: data[ key ].business_description,
          services: data[ key ].services,
          products: data[ key ].products,
          profileImg: data[ key ].profileImg,
          reviews: data[ key ].reviews,
          appointmentsDef: data[ key ].appointmentsDef
        });
      }
      setLoading(false)
      setListOfBusinesses(loadedBusiness);
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    if (listOfBusinesses.length === 0) {
      fetchBusinessesArr();
    }
  }, []);

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
        const nameMatch = business.business_name?.toLowerCase().includes(filterName.toLowerCase());
        const serviceMatch = business.services?.some(service => service.serviceType.toLowerCase().includes(filterService.toLowerCase()));
        const locationMatch =
          filterLocation === '' || business.address?.toLowerCase().includes(filterLocation.toLowerCase());
        return nameMatch && serviceMatch && locationMatch;
      }
      return false
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
      { !loading ?
        <div>
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
              filteredBusinesses.map((business) => (
                <BusinessFormat
                  listOfBusinesses={ listOfBusinesses }
                  key={ business.id }
                  { ...business }
                />
              ))
            ) }
          </div>
        </div>
        :
        <LoadingSpinner />
      }
    </>
  );
};

export default BusinessesMenu;
