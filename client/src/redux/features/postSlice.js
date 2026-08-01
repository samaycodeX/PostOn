import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : "post",
    initialState : {
        singlePost : null,
        allPost : []
    },
    reducers : {
        setSinglePost : (state, action) => {
            state.singlePost = action.payload
        },
        setAllPOst : (state, action) => {
            state.allPost = action.payload
        }
    }
})

export const {setSinglePost ,setAllPOst} = postSlice.actions;
export default postSlice.reducer