import { createSlice } from "@reduxjs/toolkit";

const searchSourcesSlice = createSlice({
  name: "searchSources",
  initialState: {
    sources: [],

    loading: false,
    error: null,
  },
  reducers: {
    startSearchingSources: (state) => {
      state.loading = true;
    },
    searchSourcesSuccess: (state, action) => {
      state.loading = false;
      state.sources = action.payload.data;
    },
    searchSourcesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  startSearchingSources,
  searchSourcesSuccess,
  searchSourcesFailure,
} = searchSourcesSlice.actions;
export default searchSourcesSlice.reducer;
