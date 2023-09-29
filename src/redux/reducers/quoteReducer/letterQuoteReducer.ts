import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
//apiHelper
import { LETTER_QUOTE_URL, PACKAGE_QUOTE_URL } from "../../../apiHelper";
//model
import { Quote } from "../../../models/QuotesState";

const letterReducer = createSlice({
  name: "quote",
  initialState: {
    quotes: [],
    error:'',
    success:''
  } as Quote,
  reducers: {
    AddLetter: (state, actions) => {
      const { values, postalFrom, postalTo, token } = actions.payload;
      console.log(values, postalFrom, postalTo);
      const combined = {
        ...values,
        ...postalFrom,
        ...postalTo,
      };
      axios
        .post(LETTER_QUOTE_URL, combined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res, "res");
          // state.success = res.data.created

        })
        .catch((er) => {
          console.log(er, 'er')
        });
    },
    AddPackage: (state, actions) => {
      const { values, postalFrom, postalTo, dropDown, token } = actions.payload;
      console.log(values, postalFrom, postalTo);
      const combined = {
        ...values,
        ...postalFrom,
        ...postalTo,
        ...dropDown
      };
      axios
        .post(PACKAGE_QUOTE_URL, combined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res, "res");
          // state.success = res.data.created

        })
        .catch((er) => {
          console.log(er, 'er')
        });
    },
  },
});
export const { AddLetter,  AddPackage } = letterReducer.actions;
export default letterReducer.reducer;
