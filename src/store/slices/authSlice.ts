import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  role: "admin" | "user";
}

const initialState: AuthState = {
  role: "admin",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
