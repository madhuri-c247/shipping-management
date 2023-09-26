import { createSlice } from "@reduxjs/toolkit";
import { LETTER_QUOTE_URL } from "../../../apiHelper";
import axios from "axios";

const letterReducer = createSlice({
  name: "quote",
  initialState: {
    quotes: [],
  },
  reducers: {
    AddLetter: (states, actions) => {
      const quotes = actions.payload.values;
      console.log(quotes, "quotes");
      axios.post(LETTER_QUOTE_URL, quotes);
      console.log(states, actions, "actions");
    },
  },
});
export const { AddLetter } = letterReducer.actions;
export default letterReducer.reducer;
