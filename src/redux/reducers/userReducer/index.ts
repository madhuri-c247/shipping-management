import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/UserState";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  } as User,
  reducers: {
    AddUser: (state, action) => {
      console.log(action.payload);
      
    },
  },
});

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
