import {createSlice} from "@reduxjs/toolkit";
import {SNACKBAR_TYPES} from "../../../../helpers/constants.tsx";

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        open: false,
        message: "",
        severity: SNACKBAR_TYPES.INFO,
    },
    reducers: {
        showSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || SNACKBAR_TYPES.INFO;
        },
        hideSnackbar: (state) => {
            state.open = false;
            state.message = "";
            state.severity = SNACKBAR_TYPES.INFO;
        },
    },
});

export const {showSnackbar, hideSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;
