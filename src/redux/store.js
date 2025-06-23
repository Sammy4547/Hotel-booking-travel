import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/booking/bookingSlice";
import authReducer from "../features/auth/authSlice";
 const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
  },
});

export default store;
