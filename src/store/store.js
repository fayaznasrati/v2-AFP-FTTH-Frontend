// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slicers/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
