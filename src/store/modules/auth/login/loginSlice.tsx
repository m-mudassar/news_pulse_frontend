import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.clear();
            sessionStorage.clear();
        },
        startRefreshingToken: (state) => {
            state.isRefreshingToken = true;
        },
        refreshTokenSuccess: (state, action) => {
            state.isRefreshingToken = false;
            state.user = action.payload;
        },
        refreshTokenFailure: (state) => {
            state.isRefreshingToken = false;
            state.user = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    refreshTokenSuccess,
    startRefreshingToken,
    refreshTokenFailure,
} = authSlice.actions;
export default authSlice.reducer;
