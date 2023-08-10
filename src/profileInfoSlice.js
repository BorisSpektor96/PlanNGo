import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: {},
  email: "redux@example.com",
  password: "Redux123!",
  fullname: "redux",
  phoneNumber: "",
  isBusiness: true,
  userType: "",
  address: "",
  business_name: "",
  business_description: "",
  business_type: "",
  services: [],
  products: [],
  reviews: [],
  favorites: [],
  appointmentsDef: [],
  messages: [],
  profileImg: ""
}

const profileInfoSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    updateProfileInfo: (state, action) => {
      return { ...action.payload };
    },
    // Other actions can be defined here as well
  },
});

export const { updateProfileInfo } = profileInfoSlice.actions;
export default profileInfoSlice.reducer;
