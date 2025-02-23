import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "getCategories",
    initialState: {
        categories: [] as any[],
        userCategories: [],
        page: 0,
        lastPage: 0,
        loading: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {
        startGettingCategories: (state) => {
            state.loading = true;
        },
        getCategoriesSuccess: (state,action) => {
            state.loading = false;
            state.categories = action.payload.data.categories.data;
            state.page = action.payload.data.categories.current_page;
            state.lastPage = action.payload.data.categories.last_page;
            state.userCategories = action.payload.data.user_categories;
        },
        loadMoreCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = [...state.categories, ...action.payload.data.categories.data];
            state.page = action.payload.data.categories.current_page;
            state.lastPage = action.payload.data.categories.last_page;
            state.userCategories = action.payload.data.user_categories;
        },
       getCategoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    startGettingCategories,
    getCategoriesSuccess,
    loadMoreCategoriesSuccess,
    getCategoriesFailure,
} = authSlice.actions;
export default authSlice.reducer;
