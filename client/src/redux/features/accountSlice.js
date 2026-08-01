import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name : "account",
    initialState : {
        acounts : []
    },
    reducers : {
        setAccounts : (state, action) => {
            state.acounts = action.payload
        }
    }
})

export const { setAccounts } = accountSlice.actions;
export default accountSlice.reducer