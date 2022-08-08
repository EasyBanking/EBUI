import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  preloadedState: {
    auth: {
      isLoggedIn: false,
      user: null,
      token: null,
    },
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
