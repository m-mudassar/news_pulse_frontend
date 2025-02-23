import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "getAuthors",
    initialState: {
        authors: [] as any[],
        userAuthors: [],
        page: 0,
        lastPage: 0,
        loading: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {
        startGettingAuthors: (state) => {
            state.loading = true;
        },
        getAuthorsSuccess: (state, action) => {
            state.loading = false;
            state.authors = action.payload.data.authors.data;
            state.page = action.payload.data.authors.current_page;
            state.lastPage = action.payload.data.authors.last_page;
            state.userAuthors = action.payload.data.user_authors;
        },
        loadMoreAuthorsSuccess: (state, action) => {
            state.loading = false;
            state.authors = [...state.authors, ...action.payload.data.authors.data];
            state.page = action.payload.data.authors.current_page;
            state.lastPage = action.payload.data.authors.last_page;
            state.userAuthors = action.payload.data.user_authors;
        },
        getAuthorsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    startGettingAuthors,
    getAuthorsSuccess,
    loadMoreAuthorsSuccess,
    getAuthorsFailure,
} = authSlice.actions;
export default authSlice.reducer;
