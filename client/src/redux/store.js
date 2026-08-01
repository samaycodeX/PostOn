import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice.js"
import postSlice from "./features/postSlice.js"
import accountSlice from "./features/accountSlice.js"

export const store = configureStore({
    reducer : {
        auth : authSlice,
        post : postSlice,
        account : accountSlice
    }
})

