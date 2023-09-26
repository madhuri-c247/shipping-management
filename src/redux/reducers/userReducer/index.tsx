import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../../models/UserState";
import axios from "axios";
import { FORGOT_PASSWORD_URL, LOGIN_BASE_URL } from "../../../apiHelper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loggedInUser: "",
    error: "",
    success: true,
  } as User,

  reducers: {
    AddUser: (state, actions) => {},

    handleLogin: (
      state: any,
      actions: {
        payload: any;
        type: string;
      }
    ) => {
      try {
        axios
          .post(LOGIN_BASE_URL, actions.payload)
          .then((response) => {
            if (response.status === 200) {
              state.success = true;
              sessionStorage.setItem("token", response.data.token);
              return state.success;
            }
          })
          .catch((err) => {
            state.success = false;
            return state.success;
          });
      } catch (error) {
        state.success = false;
        return state.success;
      }
    },

    handleForgetPassword: (state, actions) => {
      console.log(actions.payload.email, "action");
      const email = actions.payload.email;
      try {
        axios
          .put(FORGOT_PASSWORD_URL, {
            email: email,
          })
          .then((res) => {
            console.log(res, "res");
          });
      } catch (error) {}
    },

    handleReset: (state, actions) => {
      console.log(actions, "action");
      const { values, token, url } = actions.payload;
      try {
        axios.put(`${url}${token}`, {
          confirmPassword: values.confirmPassword,
          password: values.password,
        });
      } catch (error) {}
    },
  },
});

export const { AddUser, handleLogin, handleForgetPassword, handleReset } =
  userSlice.actions;
export default userSlice.reducer;
