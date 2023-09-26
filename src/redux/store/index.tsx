import { configureStore } from "@reduxjs/toolkit";
//reducers
import userReducer from "../reducers/userReducer/index";
import letterReducer from "../reducers/quoteReducer/letterQuoteReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quotes: letterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
