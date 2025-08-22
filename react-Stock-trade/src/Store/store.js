import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "../features/stockSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer
  }
});
