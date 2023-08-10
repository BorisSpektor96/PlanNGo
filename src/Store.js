import { configureStore } from '@reduxjs/toolkit';
import profileInfoReducer from './profileInfoSlice';

const Store = configureStore({
  reducer: {
    profileInfo: profileInfoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { Store };
