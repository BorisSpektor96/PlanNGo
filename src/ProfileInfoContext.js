import React, { createContext, useReducer } from 'react';

export const ProfileInfoContext = createContext();

const initialState = localStorage.getItem('userData')

// const initialState = {
//   firstname: "Boris",
//   lastname: "Spektor",
//   email: "mail@gmail.com",
//   businessAddress: "Israel TLV",
//   businessName: "Something",
//   businessDescription: "Lorem Ipsum is simply dummsy text of the printing",
//   phoneNumber: "05412345678",
//   images: [],
//   products: [
//     {
//       id: 1,
//       name: "product name1",
//       quantity: 5,
//       price: 123,
//       description: "lorem ipsu111111m dular lorem ipsum dular",
//       image: "",
//     },
//     {
//       id: 2,
//       name: "product name2",
//       quantity: 52,
//       price: 444,
//       description: "lorem22222 ipsum dular lorem ipsum dular",
//       image: "",
//     },
//   ],
//   services: [
//     {
//       id: 1,
//       name: "service name1",
//       duration: "30",
//       price: 4,
//       description: "11111 ipsum dular lorem ipsum dular",
//       type: "sometype1",
//     },
//     {
//       id: 2,
//       name: "service name2",
//       duration: "60",
//       price: 444,
//       description: "lorem22222 ipsum dular lorem ipsum dular",
//       type: "sometype2",
//     },
//   ],
// };

// Define the reducer function
const profileInfoReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_INFO':
      return { ...state, ...action.payload };
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
export const ProfileInfoProvider = ({ children }) => {
  const [ profileInfo, dispatch ] = useReducer(profileInfoReducer, initialState);

  return (
    <ProfileInfoContext.Provider value={ { profileInfo, dispatch } }>
      { children }
    </ProfileInfoContext.Provider>
  );
};
