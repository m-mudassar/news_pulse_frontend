import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "register",
    initialState: {
        loading: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {
        startRegister: (state) => {
            state.loading = true;
        },
        registerSuccess: (state) => {
            state.loading = false;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    startRegister,
    registerSuccess,
    registerFailure,
} = authSlice.actions;
export default authSlice.reducer;
