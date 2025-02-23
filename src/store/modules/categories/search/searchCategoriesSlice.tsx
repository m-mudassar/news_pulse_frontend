import { createSlice } from "@reduxjs/toolkit";

const searchCategoriesSlice = createSlice({
  name: "searchCategories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    startSearchingCategories: (state) => {
      state.loading = true;
    },
    searchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
    },
    searchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    startSearchingCategories,
    searchCategoriesSuccess,
    searchCategoriesFailure,
} = searchCategoriesSlice.actions;
export default searchCategoriesSlice.reducer;
