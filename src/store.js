import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "./slices/UserSlices";
export default configureStore({
  reducer: {
    allusersInfo: UserSlices,
  },
});
