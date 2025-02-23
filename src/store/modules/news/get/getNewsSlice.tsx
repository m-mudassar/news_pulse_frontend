import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "getNews",
    initialState: {
        news: [],
        currentNewsPage: 0,
        totNewsPages: 0,
        loading: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {
        startGettingNews: (state) => {
            state.loading = true;
        },
        getNewsSuccess: (state,action) => {
            state.loading = false;
            state.news = action.payload.data.data;
            state.currentNewsPage = action.payload.data.current_page;
            state.totNewsPages = action.payload.data.last_page;
        },
        getNewsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    startGettingNews,
    getNewsSuccess,
    getNewsFailure
} = authSlice.actions;
export default authSlice.reducer;
