import { createSlice } from "@reduxjs/toolkit";
import { User} from "../../../models/UserState";
  import { SIGNUP_BASE_URL } from "../../../constants";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  } as User,
  reducers: {
    AddUser: (state, actions) => {
        const user = actions.payload;
        console.log(user,'user');
        if(user){
          axios.post(SIGNUP_BASE_URL, user)
        }
    },
  },
});

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
