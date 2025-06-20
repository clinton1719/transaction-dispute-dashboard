import type { Transaction } from "@/types";
import mockTransactions from "@/utils/mockTransactions.json";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface TransactionState {
    items: Transaction[];
}

const initialState: TransactionState = {
    items: mockTransactions
};

export const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        submitTransaction: (state, action: PayloadAction<Transaction>) => {
            state.items.push(action.payload);
        },
    },
});

export const { submitTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
