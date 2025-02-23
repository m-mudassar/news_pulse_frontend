import { createSlice } from "@reduxjs/toolkit";

const searchAuthorSlice = createSlice({
  name: "searchAuthors",
  initialState: {
    authors: [],

    loading: false,
    error: null,
  },
  reducers: {
    startSearchingAuthors: (state) => {
      state.loading = true;
    },
    searchAuthorsSuccess: (state, action) => {
      state.loading = false;
      state.authors = action.payload.data;
    },
    searchAuthorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    startSearchingAuthors,
    searchAuthorsSuccess,
    searchAuthorsFailure,
} = searchAuthorSlice.actions;
export default searchAuthorSlice.reducer;
