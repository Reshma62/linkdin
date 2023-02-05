import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userLoginInfo")
      ? JSON.parse(localStorage.getItem("userLoginInfo"))
      : null,
  },
  reducers: {
    allUsers: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { allUsers } = userSlice.actions;

export default userSlice.reducer;
