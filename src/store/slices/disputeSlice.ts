import type { Dispute } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DisputeState {
  items: Dispute[];
}

const initialState: DisputeState = {
  items: [],
};

export const disputeSlice = createSlice({
  name: "disputes",
  initialState,
  reducers: {
    submitDispute: (state, action: PayloadAction<Dispute>) => {
      state.items.push(action.payload);
    },
  },
});

export const { submitDispute } = disputeSlice.actions;
export default disputeSlice.reducer;
