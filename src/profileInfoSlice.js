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
  appointmentsDef: {},
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
      state.appointmentsDef = action.payload;
    },
    updateAppointments: (state, action) => {
      if (state.isBusiness) {
        state.appointmentsDef.appointments = action.payload;
      } else {
        state.appointments = action.payload;
      }
    },
    incrementProductQuantity: (state, action) => {
      for (let product of state.products) {
        if (product.productId === action.payload.productId) {
          product.quantity += action.payload.increment
        }
      }
    },
    decrementProductQuantity: (state, action) => {
      for (let product of state.products) {
        if (product.productId === action.payload.productId) {
          if (product.quantity > 0) {
            product.quantity -= action.payload.decrement
          }
        }
      }
    },
    deleteProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        product => product.id === action.payload
      )
      if (productIndex !== -1) {
        state.products.splice(productIndex, 1)
      }
    },
    addProduct: (state, action) => {
      state.products = action.payload
    },
    addService: (state, action) => {
      state.services = [ ...state.services, action.payload ]
    },
    deleteService: (state, action) => {
      const serviceIndex = state.services.findIndex(
        service => service.serviceId === action.payload
      )
      if (serviceIndex !== -1) {
        state.services.splice(serviceIndex, 1)
      }
    },
  },
});

export const { updateProfileInfo,
  updateFavorites,
  updateMessages,
  updateAppointmentsDef,
  updateAppointments,
  incrementProductQuantity,
  decrementProductQuantity,
  deleteProduct,
  addProduct,
  addService,
  deleteService,
} = profileInfoSlice.actions;
export default profileInfoSlice.reducer;
