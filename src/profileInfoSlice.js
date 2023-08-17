import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: {},
  email: "redux@example.com",
  password: "Redux123!",
  fullname: "redux",
  phoneNumber: "",
  isBusiness: true,
  address: "",
  business_name: "",
  business_description: "",
  business_type: "",
  services: [],
  products: [],
  reviews: [],
  favorites: [],
  appointments: [],
  appointmentsDef: [ {} ],
  messages: [],
  profileImg: "",
  securityQuestion: {},
}

const profileInfoSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    updateProfileInfo: (state, action) => {
      return { ...action.payload };
    },
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateAppointmentsDef: (state, action) => {
      state.appointmentsDef[ 0 ] = action.payload;
    },
    updateAppointments: (state, action) => {
      if (state.isBusiness) {
        console.log("dispatch Business")
        state.appointmentsDef[ 0 ].appointments = action.payload;
      } else {
        state.appointments = action.payload;
      }
    },
    incrementProductQuantity: (state, action) => {
      console.log(action.payload)
      for(let product of state.products) {
        if(product.productId === action.payload.productId) {
          // product.quantity += action.payload.increment
          // console.log(action.payload.productId)
          // console.log(action.payload.increment)
        }
      }
    }
    // Other actions can be defined here as well
  },
});

export const { updateProfileInfo,
  updateFavorites,
  updateMessages,
  updateAppointmentsDef,
  updateAppointments,
  incrementProductQuantity
} = profileInfoSlice.actions;
export default profileInfoSlice.reducer;
