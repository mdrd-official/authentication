import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userAuth");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userAuth", serializedState);
  } catch {}
};

const INITIAL_STATE = loadState() || {
  isAuthenticated: false,
  isUploaded: false,
  user: null,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState: INITIAL_STATE,
  reducers: {
    setData: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveState(state);
    },
    setProfileImage: (state, action) => {
      state.isUploaded = true;
      state.user = action.payload;
      saveState(state);
    },

    clearData: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      saveState(state);
    },
  },
});

export const { setData, clearData, setProfileImage } = userSlice.actions;
export default userSlice.reducer;
