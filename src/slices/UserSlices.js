import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userLoginInfo")
      ? JSON.parse(localStorage.getItem("userLoginInfo"))
      : null,
    userProfilepic: null,
  },
  reducers: {
    allUsers: (state, action) => {
      state.userInfo = action.payload;
    },
    profliePic: (state, action) => {
      state.userProfilepic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { allUsers, profliePic } = userSlice.actions;

export default userSlice.reducer;
