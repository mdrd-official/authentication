import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem("admin") ? true : false,
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState: INITIAL_STATE,
  reducers: {
    setData: (state) => {
      localStorage.setItem("admin", true);
      const status = localStorage.getItem("admin");  

      state.isAuthenticated = status; // Set to true when admin is authenticated
    },
    clearData: (state) => {
      state.isAuthenticated = false; // Set to false when admin is not authenticated
      localStorage.removeItem("admin"); // Remove the "admin" item from localStorage
    },
  },
});

export const { setData, clearData } = adminSlice.actions;
export default adminSlice.reducer;
