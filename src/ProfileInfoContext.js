import React, { createContext, useReducer, useEffect } from 'react';

export const ProfileInfoContext = createContext();

const profileInfoReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_INFO':
      return { ...action.payload };
    case 'UPDATE_PRODUCTS':
      return { ...state, products: action.payload };
    case 'UPDATE_SERVICES':
      return { ...state, services: action.payload };
    case 'DELETE_SERVICE':
      if (state.services.length > 0) {
        return { ...state, services: action.payload };
      } else {
        return { ...state, services: [] }
      }
    case 'DELETE_PRODUCT':
      if (state.products.length > 0) {
        return { ...state, products: action.payload };
      } else {
        return { ...state, products: [] }
      }
    default:
      return state;
  }
};

// Create the provider component
const ProfileInfoProvider = ({ children }) => {

  const initialState = {
    _id: {},
    email: "context@example.com",
    password: "Context123!",
    fullname: "useContext",
    phoneNumber: "1234567890",
    isBusiness: true,
    userType: "B",
    address: "123 Main context Street",
    business_name: "Hair Salon",
    business_description: "A trendy hair salon offering a range of services.",
    business_type: "hair salon",
    services: [],
    products: [],
    reviews: [],
    profileImg: "http://bootdey.com/img/Content/avatar/avatar1.png"
  }

  const [ profileInfo, dispatch ] = useReducer(
    profileInfoReducer,
    initialState
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myData'));
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: storedData });
  }, []);

  return (
    <ProfileInfoContext.Provider value={ { profileInfo, dispatch } }>

      { children }

    </ProfileInfoContext.Provider>
  );
};

export default ProfileInfoProvider