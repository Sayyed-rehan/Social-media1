import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "counter",
  initialState: {
    userData: null,
    selUser: null,
  },
  reducers: {
    saveAllUsersToStore: (state, action) => {
      state.userData = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveAllUsersToStore, setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
