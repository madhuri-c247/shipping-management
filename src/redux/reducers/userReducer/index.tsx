import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../../models/UserState";
import axios from "axios";
import { FORGOT_PASSWORD_URL, LOGIN_BASE_URL } from "../../../apiHelper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loggedInUser: ''

  } as User,

  reducers: {
    AddUser: (state, actions) => {
      const user = actions.payload;
      console.log(user, 'user');
      if (user) {

      }
    },
    handleLogin: (state, actions) => {
      try {
        axios
          .post(LOGIN_BASE_URL, actions.payload)
          .then((response) => {
            console.log(response, "response");
            if (response.status === 200) {
              sessionStorage.setItem("token", response.data.token);
              return true
            }
          })
          .catch((err) => {
            console.log(err)
          });
      } catch (error) { }
    },

    handleForgetPassword: (state, actions) => {
      console.log(actions.payload.email, 'action')
      const email = actions.payload.email
      try {
        axios.put(FORGOT_PASSWORD_URL, {
          email: email
        }).then((res) => {
          console.log(res, 'res')
        }
        )
      } catch (error) {

      }
      // console.log(actions.payload,'forogotte')
    }

  },
});

export const { AddUser, handleLogin, handleForgetPassword } = userSlice.actions;
export default userSlice.reducer;
