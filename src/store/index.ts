import { configureStore } from "@reduxjs/toolkit";
import disputeReducer from "./slices/disputeSlice";
import authReducer from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    disputes: disputeReducer,
    auth: authReducer,
    transactions: transactionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
