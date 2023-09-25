import { createSlice } from "@reduxjs/toolkit";
import { User, UserState} from "../../../models/UserState";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loggedIn: false
  } as UserState,
  reducers: {
    AddUser: (state, actions) => {
        const user = actions.payload;
        console.log(user,'user');
        if(user){
         
        }
    },
  },
});

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
