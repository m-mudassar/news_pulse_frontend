import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "getSources",
    initialState: {
        sources: [] as any[],
        userSources: [],
        page: 0,
        lastPage: 0,
        loading: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {
        startGettingSources: (state) => {
            state.loading = true;
        },
        getSourcesSuccess: (state, action) => {
            state.loading = false;
            state.sources = action.payload.data.sources.data;
            state.page = action.payload.data.sources.current_page;
            state.lastPage = action.payload.data.sources.last_page;
            state.userSources = action.payload.data.user_sources;
        },
        loadMoreSourcesSuccess: (state, action) => {
            state.loading = false;
            state.sources = [...state.sources, ...action.payload.data.sources.data];
            state.page = action.payload.data.sources.current_page;
            state.lastPage = action.payload.data.sources.last_page;
            state.userSources = action.payload.data.user_sources;
        },
        getSourcesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    startGettingSources,
    loadMoreSourcesSuccess,
    getSourcesSuccess,
    getSourcesFailure,
} = authSlice.actions;
export default authSlice.reducer;
