import { createSlice } from "@reduxjs/toolkit";


const accountSlice = createSlice({
    name: "account",
    initialState: {
        accounts: [],
        loading: false,
        connecting: null, // platform id currently connecting, for a spinner in the UI
        error: null,
    },
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
        addAccountToList: (state, action) => {
            state.accounts.push(action.payload);
        },
        removeAccountFromList: (state, action) => {
            state.accounts = state.accounts.filter((a) => a._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setConnecting: (state, action) => {
            state.connecting = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setAccounts,
    addAccountToList,
    removeAccountFromList,
    setLoading,
    setConnecting,
    setError,
} = accountSlice.actions;
export default accountSlice.reducer;