import React, { createContext, useReducer, useEffect } from 'react';

// let personalInfo = {
//   _id: {},
//   email: "hairsalon@example.com",
//   password: "Password123!",
//   fullname: "bbbb",
//   personal_phone: "1234567890",
//   userType: "B",
//   address: "123 Main Street",
//   business_phone: "9876543210",
//   business_email: "business@example.com",
//   business_name: "Hair Salon",
//   business_description: "A trendy hair salon offering a range of services.",
//   isBusiness: true,
//   business_type: "hair salon",
//   services: [
//     {
//       name: "Haircut",
//       price: 30,
//       duration: "1 hour",
//       id: "service1"
//     },
//     {
//       name: "Hair Coloring",
//       price: 50,
//       duration: "2 hours",
//       id: "service2"
//     }
//   ],
//   products: [
//     {
//       productId: "1",
//       price: 15,
//       description: "Moisturizing Shampoo",
//       name: "Shampoo context state",
//       quantity: 100,
//       photo: "shampoo.jpg"
//     },
//     {
//       productId: "2",
//       price: 25,
//       description: "Hair Styling Gel",
//       name: "Hair Gel",
//       quantity: 50,
//       photo: "hairgel.jpg"
//     }
//   ],
//   "business_photo_gallery": [],
//   "reviews": [
//     {
//       reviewer: "keren shnaider hair",
//       date: "20/09/2021",
//       content: "It was a simple tip of the hat. Grace didn't think that anyone else besides her had even noticed it. It wasn't anything that the average person would notice, let alone remember at the end of the day. That's why it seemed so unbelievable that this little gesture would ultimately change the course of the world",
//       rating: 2
//     },
//   ],
// };

export let ProfileInfoContext = createContext(
  {
    _id: {},
    email: "hairsalon@example.com",
    password: "Password123!",
    fullname: "bbbb",
    personal_phone: "1234567890",
    userType: "B",
    address: "123 Main Street",
    business_phone: "9876543210",
    business_email: "business@example.com",
    business_name: "Hair Salon",
    business_description: "A trendy hair salon offering a range of services.",
    isBusiness: true,
    business_type: "hair salon",
    services: [
      {
        name: "Haircut",
        price: 30,
        duration: "1 hour",
        id: "service1"
      },
      {
        name: "Hair Coloring",
        price: 50,
        duration: "2 hours",
        id: "service2"
      }
    ],
    products: [
      {
        productId: "1",
        price: 15,
        description: "Moisturizing Shampoo",
        name: "Shampoo context state",
        quantity: 100,
        photo: "shampoo.jpg"
      },
      {
        productId: "2",
        price: 25,
        description: "Hair Styling Gel",
        name: "Hair Gel",
        quantity: 50,
        photo: "hairgel.jpg"
      }
    ],
    "business_photo_gallery": [],
    "reviews": [
      {
        reviewer: "keren shnaider hair",
        date: "20/09/2021",
        content: "It was a simple tip of the hat. Grace didn't think that anyone else besides her had even noticed it. It wasn't anything that the average person would notice, let alone remember at the end of the day. That's why it seemed so unbelievable that this little gesture would ultimately change the course of the world",
        rating: 2
      },
    ],
  }
);

// fetch('http://localhost:3001/business/updateProfile', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(action.payload),
// })
//   .then((response) => response.json())
//   .catch((error) => {
//     // Handle any errors
//     console.error(error);
//   });
// Define the reducer function
const profileInfoReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_INFO':
      return {  ...action.payload };
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

  const [ profileInfo, dispatch ] = useReducer(profileInfoReducer, ProfileInfoContext);

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